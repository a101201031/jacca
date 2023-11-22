import { Dialog } from '@mui/material';
import type { DialogProps } from '@mui/material';

interface PopupProps extends Omit<DialogProps, 'open' | 'onClose'> {
  isOpen: boolean;
  onClose: () => void;
}

export function Popup({ onClose, isOpen, children, ...option }: PopupProps) {
  return (
    <Dialog {...option} open={isOpen} onClose={onClose}>
      {children}
    </Dialog>
  );
}
