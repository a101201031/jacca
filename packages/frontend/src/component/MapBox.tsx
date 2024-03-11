import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MapBox = styled(Box)`
  width: 640px;
  height: 320px;
  margin: auto;
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: calc(100% - 1rem);
    height: 22vh;
  }
`;
