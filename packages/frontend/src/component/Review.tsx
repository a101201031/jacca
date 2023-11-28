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
import { Review } from 'model';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  accessTokenAtom,
  alertSnackbarAtom,
  firebaseUserAtom,
  reviewListSelector,
} from 'store';
import { FlexBox, Space } from 'style';

interface ReviewDeleteReminderProps {
  reviewId: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewComponent({ cafeId }: { cafeId: string }) {
  const reviewList = useRecoilValue(reviewListSelector({ cafeId }));

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
      {reviewList.map((v) => (
        <ReviewContent key={v._id} {...v} />
      ))}
    </Box>
  );
}

function ReviewContent(review: Review) {
  const firebaseUser = useRecoilValue(firebaseUserAtom);
  const uid = firebaseUser?.uid;

  const [deleteReminderOpen, setDeleteReminderOpen] = useState(false);

  const reminderHandleOpen = () => {
    setDeleteReminderOpen(true);
  };
  const reminderHandleClose = () => {
    setDeleteReminderOpen(false);
  };
  return (
    <Box
      padding="20px"
      border="1px solid #e6e6eb"
      marginBottom="10px"
      maxWidth="720px"
    >
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
              <Button>수정하기</Button>
              <Button color="secondary" onClick={reminderHandleOpen}>
                삭제하기
              </Button>
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
      <Typography variant="body2">{review.content}</Typography>
    </Box>
  );
}

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
          삭제하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
