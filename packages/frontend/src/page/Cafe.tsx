import {
  EditNoteOutlined,
  PlaceOutlined,
  StarBorderOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Rating,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useRef } from 'react';
import { FlexBox, MainContainer, Space } from 'style';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    cols: 2,
  },
];

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export function Cafe() {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

  return (
    <MainContainer>
      <Box sx={{ paddingX: '1rem' }}>
        <ImageList
          sx={{ width: '100%', height: '450px' }}
          variant="quilted"
          cols={8}
          rowHeight={220}
        >
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.img, 450, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Box>
          <FlexBox marginY="0.5rem">
            <FlexBox flexWrap="wrap" alignItems="center" marginY="0.5rem">
              <Typography marginRight="1rem" variant="h4">
                TEST 카페 서울대입구점
              </Typography>
              <Rating
                value={2.6}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarBorderOutlined
                    style={{ opacity: 0.8 }}
                    fontSize="inherit"
                  />
                }
              />
              <Typography
                sx={{ color: (theme) => theme.palette.primary.dark }}
                marginLeft="1rem"
                variant="h4"
              >
                2.6
              </Typography>
            </FlexBox>
            <Space />
            <IconButton sx={{ height: '100%' }}>
              <EditNoteOutlined fontSize="large" />
              <Typography>리뷰 작성</Typography>
            </IconButton>
          </FlexBox>
          <FlexBox flexWrap="wrap" marginY="0.5rem" columnGap="0.5rem">
            <TagChip>코딩하기 좋은</TagChip>
            <TagChip>1인</TagChip>
            <TagChip>4인 이상</TagChip>
          </FlexBox>
          <FlexBox flexWrap="wrap" marginY="0.5rem" columnGap="0.5rem">
            <EditNoteOutlined fontSize="small" />
            <Typography variant="body1">2,031</Typography>
          </FlexBox>
        </Box>
      </Box>
      <Divider variant="middle" />
      <FlexBox flexWrap="wrap" paddingY="1rem">
        <CafeContentBox>
          <Box margin="1rem">
            <Typography variant="h4">평가</Typography>
            <Divider />
            <Box marginY="0.5rem">
              <Typography variant="h5">맛</Typography>
              <Divider />
              <ReviewContentContainer>
                <ReviewContentTitle>생각보다 맛있어요</ReviewContentTitle>
                <ReviewContentGraphContainer>
                  <ReviewContentGraph width="70%" />
                </ReviewContentGraphContainer>
                70%
              </ReviewContentContainer>
              <ReviewContentContainer>
                <ReviewContentTitle>보통이에요</ReviewContentTitle>
                <ReviewContentGraphContainer>
                  <ReviewContentGraph width="31%" />
                </ReviewContentGraphContainer>
                21%
              </ReviewContentContainer>
              <ReviewContentContainer>
                <ReviewContentTitle>생각보다 별로에요</ReviewContentTitle>
                <ReviewContentGraphContainer>
                  <ReviewContentGraph width="9%" />
                </ReviewContentGraphContainer>
                9%
              </ReviewContentContainer>
            </Box>
          </Box>
          <Box margin="1rem">
            <Typography variant="h4">정보</Typography>
            <Divider />
            <DetailTable>
              <tbody>
                <tr>
                  <DetailTh>
                    <PlaceOutlined fontSize="small" />
                    주소
                  </DetailTh>
                  <DetailTd>서울특별시 관악구 행운1길 0 상가 104호</DetailTd>
                </tr>
                <tr>
                  <DetailTh>전화번호</DetailTh>
                  <DetailTd>02-0000-0000</DetailTd>
                </tr>
                <tr>
                  <DetailTh>규모</DetailTh>
                  <DetailTd>1층 ~ 4층</DetailTd>
                </tr>
                <tr>
                  <DetailTh>가격대</DetailTh>
                  <DetailTd>만원 미만</DetailTd>
                </tr>
                <tr>
                  <DetailTh>영업시간</DetailTh>
                  <DetailTd>15:00 - 21:00</DetailTd>
                </tr>
                <tr>
                  <DetailTh>휴일</DetailTh>
                  <DetailTd>월, 화, 수, 목</DetailTd>
                </tr>
              </tbody>
            </DetailTable>
          </Box>
        </CafeContentBox>
        <MapContainer ref={mapElement} />
      </FlexBox>
    </MainContainer>
  );
}

const DetailTable = styled('table')`
  margin: 1rem 0;
`;

const DetailTh = styled('th')`
  width: 110px;
  display: inline-flex;
  font-size: 0.9rem;
  line-height: 1.7;
  text-align: left;
  vertical-align: top;
  padding-right: 10px;
  padding-bottom: 5px;
`;

const DetailTd = styled('td')`
  font-size: 0.9rem;
  line-height: 1.7;
  text-align: left;
  vertical-align: middle;
  padding-bottom: 5px px;
`;

const TagChip = styled('span')`
  color: ${({ theme }) => theme.palette.primary.dark};
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

const CafeContentBox = styled(Box)`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const MapContainer = styled(Box)`
  width: 320px;
  height: 320px;
  margin: auto;
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: calc(100% - 1rem);
    height: 22vh;
  }
`;

const ReviewContentContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 340px;
`;
const ReviewContentTitle = styled(Box)`
  width: 116px;
`;
const ReviewContentGraphContainer = styled(Box)`
  width: 144px;
  height: 15px;
  background-color: ${({ theme }) => theme.palette.grey[300]};
`;
const ReviewContentGraph = styled(Box)`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.primary.dark};
`;
