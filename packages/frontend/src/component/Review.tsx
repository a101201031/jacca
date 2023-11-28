import { StarBorderOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Rating,
  Typography,
} from '@mui/material';
import { scoreToText } from 'helper';
import { Review } from 'model';
import { useRecoilValue } from 'recoil';
import { firebaseUserAtom, reviewListSelector } from 'store';
import { FlexBox, Space } from 'style';

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
              <Button color="secondary">삭제하기</Button>
            </Box>
          </>
        )}
      </FlexBox>
      <Typography variant="body2">{review.content}</Typography>
    </Box>
  );
}
