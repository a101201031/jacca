import {
  AddOutlined,
  EditNoteOutlined,
  PlaceOutlined,
  StarBorderOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Rating,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AsyncBoundary, CafeTagAddForm, Popup } from 'component';
import { ReviewAddForm } from 'component/ReviewForm';
import { scoreToText } from 'helper';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  accessTokenAtom,
  cafeInfoSelector,
  firebaseUserAtom,
  reviewListSelector,
} from 'store';
import { FlexBox, MainContainer, Space } from 'style';

export function Cafe() {
  return (
    <>
      <Toolbar />
      <MainContainer>
        <AsyncBoundary
          suspenseFallback={<></>}
          errorFallback={() => {
            return <></>;
          }}
        >
          <CafeContent />
        </AsyncBoundary>
      </MainContainer>
    </>
  );
}

function CafeContent() {
  const [cafeTagAddPopupOpen, setCafeTagAddPopupOpen] = useState(false);
  const [reviewAddPopupOpen, setReviewAddPopupOpen] = useState(false);
  const accessToken = useRecoilValue(accessTokenAtom);
  const firebaseUser = useRecoilValue(firebaseUserAtom);
  const uid = firebaseUser?.uid;

  const { cafeId } = useParams<{ cafeId: string }>() as Readonly<{
    cafeId: string;
  }>;
  const mapElement = useRef(null);
  const cafeInfo = useRecoilValue(cafeInfoSelector({ cafeId }));
  const reviewList = useRecoilValue(reviewListSelector({ cafeId }));

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(
      cafeInfo.location.coordinates[1],
      cafeInfo.location.coordinates[0],
    );
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
  }, [cafeInfo.location.coordinates]);

  const cafeTagAddHandleOpen = () => {
    setCafeTagAddPopupOpen(true);
  };
  const cafeTagAddHandleClose = () => {
    setCafeTagAddPopupOpen(false);
  };
  const reviewAddHandleOpen = () => {
    setReviewAddPopupOpen(true);
  };
  const reviewAddHandleClose = () => {
    setReviewAddPopupOpen(false);
  };

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
            <IconButton sx={{ height: '100%' }} onClick={reviewAddHandleOpen}>
              <EditNoteOutlined fontSize="large" />
              <Typography>리뷰 작성</Typography>
            </IconButton>
            <Popup
              isOpen={reviewAddPopupOpen}
              onClose={reviewAddHandleClose}
              fullWidth
            >
              <ReviewAddForm cafeId={cafeId} onClose={reviewAddHandleClose} />
            </Popup>
          </FlexBox>
          <FlexBox flexWrap="wrap" marginY="0.5rem">
            {!!cafeInfo.tags.length &&
              cafeInfo.tags.map((v) => <TagChip key={v._id}>{v.tag}</TagChip>)}
            {accessToken && (
              <>
                <TagChip onClick={cafeTagAddHandleOpen}>
                  태그 추가 <AddOutlined />
                </TagChip>
                <Popup
                  isOpen={cafeTagAddPopupOpen}
                  onClose={cafeTagAddHandleClose}
                  fullWidth
                >
                  <CafeTagAddForm
                    cafeId={cafeId}
                    onClose={cafeTagAddHandleClose}
                  />
                </Popup>
              </>
            )}
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
        <MapContainer ref={mapElement} />
      </FlexBox>

      <Box margin="1rem">
        <Typography variant="h4">리뷰</Typography>
        <Divider />
        <FlexBox justifyContent="space-between" width="100%" marginY="1rem">
          <Box bgcolor={'#FAFAFA'}>
            <Button variant="text">별점 높은 순</Button>
            <Button variant="text">별점 낮은 순</Button>
            <Button variant="text">최신순</Button>
          </Box>
        </FlexBox>
        {reviewList.map((v) => (
          <Box
            key={v._id}
            padding="20px"
            border="1px solid #e6e6eb"
            marginBottom="10px"
            maxWidth="720px"
          >
            <FlexBox>
              <Avatar>{v.userId.displayName}</Avatar>
              <FlexBox marginLeft="1rem" flexDirection="column">
                <Typography variant="body1">
                  <Box component="span" fontWeight="600">
                    {v.userId.displayName}
                  </Box>
                </Typography>
                <FlexBox flexDirection="row" alignItems="center">
                  <Rating
                    value={v.score}
                    size="small"
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
                    sx={{ color: (theme) => theme.palette.primary.main }}
                    marginLeft="0.5rem"
                    variant="body1"
                  >
                    {scoreToText(v.score)}
                  </Typography>
                </FlexBox>
              </FlexBox>
              {uid === v.userId._id && (
                <>
                  <Space />
                  <Box>
                    <Button>수정하기</Button>
                    <Button color="secondary">삭제하기</Button>
                  </Box>
                </>
              )}
            </FlexBox>
            <Typography variant="body2">{v.content}</Typography>
          </Box>
        ))}
      </Box>
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

const TagChip = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.main};
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
  width: 640px;
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
  background-color: ${({ theme }) => theme.palette.primary.main};
`;
