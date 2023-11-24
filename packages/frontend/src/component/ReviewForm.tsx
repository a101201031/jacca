import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
} from '@mui/material';
import { fetcher, isAxiosError, scoreToText } from 'helper';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenAtom, alertSnackbarAtom } from 'store';
import { DefaultTextField, FlexBox } from 'style';

interface ReviewAddFormProps {
  onClose: () => void;
  cafeId: string;
}

interface ReviewAddFormInput {
  content: string;
}

export function ReviewAddForm({ onClose, cafeId }: ReviewAddFormProps) {
  const accessToken = useRecoilValue(accessTokenAtom);
  const setSnackbar = useSetRecoilState(alertSnackbarAtom);

  const [isLoaded, setIsLoaded] = useState(true);
  const [score, setScore] = useState(3);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit: SubmitHandler<ReviewAddFormInput> = async ({ content }) => {
    setIsLoaded(false);

    try {
      fetcher.post({
        path: '/review',
        bodyParams: {
          cafeId,
          score: score * 20,
          content,
        },
        accessToken,
      });
      setSnackbar({
        open: true,
        severity: 'success',
        message: '리뷰가 등록되었습니다.',
      });
      onClose();
    } catch (e) {
      if (isAxiosError<{ error: { code: string; message: string } }>(e)) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: '리뷰 등록을 실패했습니다.',
        });
      }
    } finally {
      setIsLoaded(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>리뷰 등록하기</DialogTitle>
      <DialogContent dividers>
        <FlexBox marginBottom="1rem" columnGap="1rem">
          <Rating
            name="rating"
            value={score}
            onChange={(_, v) => {
              setScore(v ?? 1);
            }}
          />
          <Typography>{scoreToText(score)}</Typography>
        </FlexBox>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <DefaultTextField
              {...field}
              multiline
              fullWidth
              minRows={3}
              maxRows={6}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit" disabled={!isLoaded}>
          추가
        </Button>
        <Button onClick={onClose} disabled={!isLoaded}>
          취소
        </Button>
      </DialogActions>
    </form>
  );
}
