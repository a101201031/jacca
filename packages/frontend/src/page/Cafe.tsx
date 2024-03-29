import {
  EditNoteOutlined,
  PlaceOutlined,
  StarBorderOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  ImageList,
  ImageListItem,
  Rating,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AsyncBoundary, ReviewComponent, TagChip, UserGuard } from 'component';
import {
  CafeTagAddContainer,
  MapContainer,
  ReviewAddContainer,
} from 'containers';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cafeInfoSelector } from 'store';
import { FlexBox, MainContainer, Space } from 'style';

export function Cafe() {
  return (
    <>
      <AsyncBoundary suspenseFallback={<></>} errorFallback={() => <></>}>
        <Toolbar />
        <MainContainer>
          <CafeContent />
        </MainContainer>
      </AsyncBoundary>
    </>
  );
}

function CafeContent() {
  const { cafeId } = useParams<{ cafeId: string }>() as Readonly<{
    cafeId: string;
  }>;
  const cafeInfo = useRecoilValue(cafeInfoSelector({ cafeId }));

  return (
    <>
      <Box sx={{ paddingX: '1rem' }}>
        <ImageList
          sx={{ width: '100%', height: '450px' }}
          variant="quilted"
          cols={8}
          rowHeight={220}
        >
          {cafeInfo.images.map((v) => (
            <ImageListItem key={v._id} cols={2} rows={2}>
              <img src={v.url} alt={v.title} />
            </ImageListItem>
          ))}
        </ImageList>
        <Box>
          <FlexBox marginY="0.5rem">
            <FlexBox flexWrap="wrap" alignItems="center" marginY="0.5rem">
              <Typography marginRight="1rem" variant="h4">
                {cafeInfo.title}
              </Typography>
              <Rating
                value={Number(cafeInfo.rating.toFixed(1))}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarBorderOutlined
                    style={{ opacity: 0.8 }}
                    fontSize="inherit"
                  />
                }
              />
              <Typography color="primary" marginLeft="1rem" variant="h4">
                {cafeInfo.rating.toFixed(1)}
              </Typography>
            </FlexBox>
            <Space />
            <ReviewAddContainer cafeId={cafeId} />
          </FlexBox>
          <FlexBox flexWrap="wrap" marginY="0.5rem">
            {!!cafeInfo.tags.length &&
              cafeInfo.tags.map((v) => <TagChip key={v._id}>{v.tag}</TagChip>)}
            <UserGuard>
              <CafeTagAddContainer cafeId={cafeId} />
            </UserGuard>
          </FlexBox>
          <FlexBox flexWrap="wrap" marginY="0.5rem" columnGap="0.5rem">
            <EditNoteOutlined fontSize="small" />
            <Typography variant="body1">2,031</Typography>
          </FlexBox>
        </Box>
      </Box>
      <Divider variant="middle" />
      <FlexBox flexWrap="wrap" paddingY="1rem" justifyContent="center">
        <CafeContentBox>
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
        <MapContainer location={cafeInfo.location} />
      </FlexBox>
      <ReviewComponent cafeId={cafeId} />
    </>
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

const CafeContentBox = styled(Box)`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;
