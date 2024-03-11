import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TagChip = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.main};
  background: ${({ theme }) => theme.palette.grey[100]};
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 0.875rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  border-radius: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 0.875rem;
  text-decoration: none;
`;
