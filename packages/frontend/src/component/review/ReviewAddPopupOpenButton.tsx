import { EditNoteOutlined } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

interface ReviewAddButtonProps {
  onOpen: () => void;
}

export function ReviewAddPopupOpenButton({ onOpen }: ReviewAddButtonProps) {
  return (
    <IconButton sx={{ height: '100%' }} onClick={onOpen}>
      <EditNoteOutlined fontSize="large" />
      <Typography>리뷰 작성</Typography>
    </IconButton>
  );
}
