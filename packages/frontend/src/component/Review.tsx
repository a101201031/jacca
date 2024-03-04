import { StarBorderOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Rating,
  Typography,
} from '@mui/material';
import { fetcher, isAxiosError, scoreToText } from 'helper';
import type { Review } from 'model';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  accessTokenAtom,
  alertSnackbarAtom,
  firebaseUserAtom,
  infiniteScrollInfoAtomFamily,
  infiniteScrollItem2dAtomFamily,
} from 'store';
import { FlexBox, Space } from 'style';
import { ReviewEditForm } from './ReviewForm';

interface ReviewDeleteReminderProps {
  reviewId: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewComponent({ cafeId }: { cafeId: string }) {
  const REVIEW_LIST_LIMIT = 10;

  const [review2dList, setReview2dList] = useRecoilState(
    infiniteScrollItem2dAtomFamily<Review>('review'),
  );
  const [scrollInfo, setScrollInfo] = useRecoilState(
    infiniteScrollInfoAtomFamily('review'),
  );

  const [lastReviewRef, setLastReviewRef] = useState<HTMLDivElement | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      const { data: reviews, paging } = await fetcher.get<{
        data: Review[];
        paging: { limit: number; offset: number; total: number };
      }>({
        path: 'reviews',
        queryParams: { cafeId, limit: `${REVIEW_LIST_LIMIT}` },
      });
      const isLast = reviews.length === paging.total;
      setScrollInfo({ isLast, offset: REVIEW_LIST_LIMIT });
      setReview2dList([reviews]);
    })();
  }, [cafeId, setReview2dList, setScrollInfo]);

  const handleScroll = useCallback(
    async ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
      if (!lastReviewRef) return;

      if (isIntersecting) {
        const { data: reviews, paging } = await fetcher.get<{
          data: Review[];
          paging: { limit: number; offset: number; total: number };
        }>({
          path: 'reviews',
          queryParams: {
            cafeId,
            limit: `${REVIEW_LIST_LIMIT}`,
            offset: `${scrollInfo.offset}`,
          },
        });
        const isLast = paging.offset + reviews.length === paging.total;
        const offset = scrollInfo.offset + REVIEW_LIST_LIMIT;
        setScrollInfo({ isLast, offset });
        setReview2dList([...review2dList, reviews]);
      }
    },
    [
      cafeId,
      lastReviewRef,
      review2dList,
      scrollInfo.offset,
      setReview2dList,
      setScrollInfo,
    ],
  );

  useEffect(() => {
    if (!lastReviewRef) return;
    if (scrollInfo.isLast) return;
    let observer = new IntersectionObserver(handleScroll, {
      threshold: 0.1,
      rootMargin: '20px',
    });
    observer.observe(lastReviewRef);

    return () => observer?.disconnect();
  }, [handleScroll, lastReviewRef, scrollInfo.isLast]);

  return (
    <Box margin="1rem">
      <Typography variant="h4">리뷰</Typography>
      <Divider />
      <FlexBox justifyContent="space-between" width="100%" marginY="1rem">
        <Box bgcolor={'#FAFAFA'}>
          <Button variant="text">별점 높은 순</Button>
          <Button variant="text">별점 낮은 순</Button>
          <Button variant="text">최신순</Button>
        </Box>
      </FlexBox>
      <FlexBox
        flexWrap="wrap"
        gap="1rem 1rem"
        justifyContent="center"
        width="720px"
        marginX="auto"
      >
        {([] as Review[]).concat(...review2dList).map((v, i, arr) => (
          <RefReviewContent
            key={v._id}
            ref={i === arr.length - 1 ? setLastReviewRef : undefined}
            {...v}
          />
        ))}
      </FlexBox>
    </Box>
  );
}

const RefReviewContent = forwardRef((review: Review, ref) => {
  const firebaseUser = useRecoilValue(firebaseUserAtom);
  const uid = firebaseUser?.uid;

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deleteReminderOpen, setDeleteReminderOpen] = useState(false);

  const editPopupHandleOpen = () => {
    setEditPopupOpen(true);
  };
  const editPopupHandleClose = useCallback(() => {
    setEditPopupOpen(false);
  }, []);

  const reminderHandleOpen = () => {
    setDeleteReminderOpen(true);
  };
  const reminderHandleClose = useCallback(() => {
    setDeleteReminderOpen(false);
  }, []);
  return (
    <Box padding="20px" border="1px solid #e6e6eb" width="720px" ref={ref}>
      <FlexBox>
        <Avatar>{review.userId.displayName}</Avatar>
        <FlexBox marginLeft="1rem" flexDirection="column">
          <Typography variant="body1">
            <Box component="span" fontWeight="600">
              {review.userId.displayName}
            </Box>
          </Typography>
          <FlexBox flexDirection="row" alignItems="center">
            <Rating
              value={review.score}
              size="small"
              readOnly
              precision={0.5}
              emptyIcon={
                <StarBorderOutlined
                  style={{ opacity: 0.8 }}
                  fontSize="inherit"
                />
              }
            />
            <Typography
              sx={{ color: (theme) => theme.palette.primary.main }}
              marginLeft="0.5rem"
              variant="body1"
            >
              {scoreToText(review.score)}
            </Typography>
          </FlexBox>
        </FlexBox>
        {uid === review.userId._id && (
          <>
            <Space />
            <Box>
              <Button onClick={editPopupHandleOpen}>수정하기</Button>
              <Button color="secondary" onClick={reminderHandleOpen}>
                삭제하기
              </Button>
              <ReviewEditForm
                {...review}
                onClose={editPopupHandleClose}
                isOpen={editPopupOpen}
              />
              <DeleteReminder
                reviewId={review._id}
                content={review.content}
                isOpen={deleteReminderOpen}
                onClose={reminderHandleClose}
              />
            </Box>
          </>
        )}
      </FlexBox>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
        {review.content}
      </Typography>
    </Box>
  );
});

function DeleteReminder({
  reviewId,
  content,
  isOpen,
  onClose,
}: ReviewDeleteReminderProps) {
  const accessToken = useRecoilValue(accessTokenAtom);
  const setSnackbar = useSetRecoilState(alertSnackbarAtom);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const deleteHandleClick = async () => {
    setIsLoaded(false);
    try {
      await fetcher.del({ path: `/review/${reviewId}`, accessToken });
      setSnackbar({
        open: true,
        severity: 'success',
        message: '리뷰가 삭제되었습니다.',
      });
      onClose();
    } catch (e) {
      if (
        isAxiosError<{ error: { code: string; message: string } }>(e) &&
        e.response?.data.error.code === 'entity_already_exists'
      ) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: '태그가 이미 등록되어 있습니다.',
        });
      }
    } finally {
      setIsLoaded(true);
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>정말 이 리뷰를 삭제할까요?</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={!isLoaded} autoFocus onClick={onClose}>
          취소
        </Button>
        <Button disabled={!isLoaded} color="error" onClick={deleteHandleClick}>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
