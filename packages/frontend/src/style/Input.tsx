import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DefaultTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${({ theme }) => theme.palette.primary.light};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.palette.primary.light};
    }
  }
`;
