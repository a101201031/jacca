import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

interface CafeAddPopupProps {
  handleClose: () => void;
  isOpen: boolean;
}

export function CafeAddPopup({ handleClose, isOpen }: CafeAddPopupProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth={true}
      >
        <Box>
          <DialogTitle>카페 등록하기</DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>카페 이름</Typography>
            <TextField
              margin="normal"
              label="카페 주소와 이름으로 검색해주세요"
              fullWidth
              id="userName"
              type="text"
              autoComplete="userName"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              추가
            </Button>
            <Button onClick={handleClose}>취소</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
