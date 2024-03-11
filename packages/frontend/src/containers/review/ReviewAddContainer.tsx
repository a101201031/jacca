import { Dialog } from '@mui/material';
import { ReviewAddForm, ReviewAddPopupOpenButton } from 'component';
import { usePopupState } from 'hooks';

export function ReviewAddContainer({ cafeId }: { cafeId: string }) {
  const { isOpen, open, close } = usePopupState();

  return (
    <>
      <ReviewAddPopupOpenButton onOpen={open} />
      <Dialog open={isOpen} onClose={close} fullWidth>
        <ReviewAddForm cafeId={cafeId} onClose={close} />
      </Dialog>
    </>
  );
}
