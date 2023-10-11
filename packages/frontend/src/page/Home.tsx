import { Box, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AsyncBoundary, CafeCard } from 'component';
import { useRecoilValue } from 'recoil';
import { cafeListAtomFamily } from 'store/atom/cafe';
import { FlexBox } from 'style';

export function Home() {
  return (
    <main>
      <Toolbar />
      <MainHeader>
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
      </MainHeader>
      <Box component="section" paddingY="2.38rem">
        <AsyncBoundary
          suspenseFallback={<></>}
          errorFallback={() => {
            return <></>;
          }}
        >
          <CafeSection />
        </AsyncBoundary>
      </Box>
    </main>
  );
}

function CafeSection() {
  const cafeList = useRecoilValue(cafeListAtomFamily('key'));
  return (
    <>
      <Typography variant="h2" color="primary.dark" paddingX="5.625rem">
        내 주변 카페 리스트
      </Typography>
      <Box marginTop="1.7rem">
        <FlexBox flexWrap="wrap" marginX="5.625rem">
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
        </FlexBox>
      </Box>
    </>
  );
}

const MainHeader = styled(Box)`
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
