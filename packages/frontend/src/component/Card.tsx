import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { CardContainer } from 'style';

export function CafeCard() {
  return (
    <CardContainer>
      <CardMedia
        component="img"
        sx={{ width: '100%', position: 'relative' }}
        image="https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          TEST 카페
        </Typography>
        <Typography variant="body2" noWrap={false}>
          서울특별시 관악구
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">위치 보기</Button>
        <Button size="small">상세 정보</Button>
      </CardActions>
    </CardContainer>
  );
}
