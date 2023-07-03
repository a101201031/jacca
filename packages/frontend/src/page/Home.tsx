import { Box, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CafeCard } from 'component';
import { FlexBox } from 'style';

export function Home() {
  return (
    <main>
      <Toolbar />
      <SearchBox>
        <Box width="100%" height="100%">
          <Typography
            variant="h1"
            color="white"
            lineHeight="45px"
            fontWeight="600"
          >
            {`노트북 들고 작업해도 눈치 안보이는 곳 없을까?`}
          </Typography>
          <Typography
            variant="h1"
            color="white"
            lineHeight="45px"
            fontWeight="600"
          >
            {`작업하기 좋은 카페, 작카`}
          </Typography>
        </Box>
      </SearchBox>
      <Box component="section" paddingY="2.38rem">
        <Box marginX="6rem">
          <Typography variant="h2" color="primary.dark">
            내 주변 카페 리스트
          </Typography>
          <FlexBox marginTop="2rem">
            <FlexBox flexWrap="wrap" margin="-1rem">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <CafeCard key={i} />
                ))}
            </FlexBox>
          </FlexBox>
        </Box>
      </Box>
    </main>
  );
}

const SearchBox = styled(Box)`
  background: linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0.3),
      rgba(20, 20, 20, 0.3)
    ),
    url(https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c);
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 500px;
  padding-top: 150px;
  overflow: hidden;
  position: relative;
  text-align: center;
`;
