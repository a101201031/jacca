import { AddOutlined } from '@mui/icons-material';
import { Dialog } from '@mui/material';
import { TagChip } from 'component/cafe/TagChip';
import { CafeTagAddForm } from 'form';
import { usePopupState } from 'hooks';

export function CafeTagAddContainer({ cafeId }: { cafeId: string }) {
  const { isOpen, open, close } = usePopupState(false);
  return (
    <>
      <TagChip onClick={open}>
        태그 추가 <AddOutlined />
      </TagChip>
      <Dialog open={isOpen} onClose={close} fullWidth>
        <CafeTagAddForm cafeId={cafeId} onClose={close} />
      </Dialog>
    </>
  );
}
