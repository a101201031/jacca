import { Dialog } from '@mui/material';
import { CafeAddPopupOpenButton } from 'component';
import { CafeAddForm } from 'form';
import { usePopupState } from 'hooks';

export function CafeAddContainer() {
  const { isOpen, open, close } = usePopupState(false);
  return (
    <>
      <CafeAddPopupOpenButton onOpen={open} />
      <Dialog open={isOpen} onClose={close} fullWidth>
        <CafeAddForm onClose={close} />
      </Dialog>
    </>
  );
}
