import { Box, CssBaseline } from '@mui/material';
import { CafeCard, TopAppBar } from 'component';
import { FlexBox, Main, MainContainer } from 'style';

export function Home() {
  return (
    <CssBaseline>
      <TopAppBar />
      <MainContainer>
        <FlexBox marginTop="2rem">
          <Main component="main">
            <FlexBox flexWrap="wrap" margin="-1rem">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <CafeCard key={i} />
                ))}
            </FlexBox>
          </Main>
        </FlexBox>
      </MainContainer>
    </CssBaseline>
  );
}
