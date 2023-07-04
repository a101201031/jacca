import { Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)`
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  ${({ theme }) => theme.breakpoints.down('xl')} {
    width: 1376px;
  }
  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 1024px;
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: calc(100% - 2rem);
  }
`;

export const Main = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.default};
  flex: 1 1 0%;
`;

export const FlexBox = styled(Box)`
  display: flex;
`;

export const Space = styled(Box)`
  flex-grow: 1;
`;

export const CardContainer = styled(Card)`
  width: calc(25% - 1rem);
  border-radius: 4px;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: calc(50% - 2rem);
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: 0px;
    width: 100%;
  }
`;
