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
import { AsyncBoundary, CafeAddPopup, CafeCard } from 'component';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenAtom, cafeListSelector } from 'store';
import { FlexBox } from 'style';

export function CafeList() {
  const [cafeAddPopupOpen, setCafeAddPopupOpen] = useState(false);
  const accessToken = useRecoilValue(accessTokenAtom);

  const cafeAddHandlOpen = () => {
    setCafeAddPopupOpen(true);
  };
  const cafeAddHandleClose = () => {
    setCafeAddPopupOpen(false);
  };

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
      <Box width={'calc(100% - 260px)'} marginLeft={'260px'} padding={'1rem'}>
        <FlexBox justifyContent="space-between" width={'100%'}>
          <Box bgcolor={'#FAFAFA'}>
            <Button variant="text">별점 높은 순</Button>
            <Button variant="text">리뷰 많은 순</Button>
            <Button variant="text">가까운 순</Button>
          </Box>
          <Box>
            {accessToken && (
              <>
                <Button variant="outlined" onClick={cafeAddHandlOpen}>
                  카페 등록하기
                </Button>
                <CafeAddPopup
                  isOpen={cafeAddPopupOpen}
                  handleClose={cafeAddHandleClose}
                />
              </>
            )}
          </Box>
        </FlexBox>
        <FlexBox flexWrap="wrap" marginX="5.625rem">
          <AsyncBoundary
            suspenseFallback={<></>}
            errorFallback={() => {
              return <></>;
            }}
          >
            <CafeListItems />
          </AsyncBoundary>
        </FlexBox>
      </Box>
    </main>
  );
}

function CafeListItems() {
  const cafeList = useRecoilValue(cafeListSelector);
  return (
    <>
      {cafeList.map((v) => (
        <CafeCard
          key={v._id}
          cafeId={v._id}
          title={v.title}
          rating={v.rating}
          address={v.address}
          imageUrl={v.images[0].url}
        />
      ))}
    </>
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
