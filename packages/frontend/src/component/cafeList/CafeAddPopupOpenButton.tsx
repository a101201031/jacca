import { Button } from '@mui/material';

interface CafeAddPopupButtonProps {
  onOpen: () => void;
}

export function CafeAddPopupOpenButton({ onOpen }: CafeAddPopupButtonProps) {
  return (
    <Button variant="outlined" onClick={onOpen}>
      카페 등록하기
    </Button>
  );
}
