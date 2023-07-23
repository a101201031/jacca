import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CafeCard } from 'component';
import { FlexBox } from 'style';

export function CafeList() {
  return (
    <main>
      <Toolbar />
      <FilterContainer position="fixed">
        <Box borderBottom="1px solid #efefef">
          <Typography variant="h3" sx={{ marginY: '0.5rem' }}>
            필터 부모 1
          </Typography>
          <FormGroup sx={{ ml: '1rem' }}>
            <FormControlLabel
              label="필터 자식 1"
              control={<Checkbox size="small" sx={{ fontSize: '1rem' }} />}
            />
            <FormControlLabel
              label="필터 자식 2"
              control={<Checkbox size="small" />}
            />
          </FormGroup>
        </Box>
        <Box borderBottom="1px solid #efefef">
          <Typography variant="h3" sx={{ marginY: '0.5rem' }}>
            필터 부모 2
          </Typography>
          <FormGroup sx={{ ml: '1rem' }}>
            <FormControlLabel
              label="필터 자식 1"
              control={<Checkbox size="small" sx={{ fontSize: '1rem' }} />}
            />
            <FormControlLabel
              label="필터 자식 2"
              control={<Checkbox size="small" />}
            />
          </FormGroup>
        </Box>
      </FilterContainer>
      <Box
        width={'calc(100% - 260px)'}
        height={'2000px'}
        marginLeft={'260px'}
        padding={'1rem'}
      >
        <Box width={'100%'} bgcolor={'#FAFAFA'}>
          <Button variant="text">별점 높은 순</Button>
          <Button variant="text">리뷰 많은 순</Button>
          <Button variant="text">가까운 순</Button>
        </Box>
        <FlexBox flexWrap="wrap" marginX="5.625rem">
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <CafeCard key={i} />
            ))}
        </FlexBox>
      </Box>
    </main>
  );
}

const FilterContainer = styled(Box)`
  width: 240px;
  margin: 1rem 0 0 1rem;
  border-right: 2px solid #707070;
  padding: 0.25rem 0.75rem;
  line-height: 1.5;
  font-size: 0.875rem;
  overflow: hidden auto;
`;
