import { StarBorder } from '@mui/icons-material';
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CardContainer } from 'style';

export function CafeCard() {
  return (
    <CardContainer>
      <CardActionArea component={RouterLink} to={`/cafe/1`}>
        <CardMedia
          component="img"
          sx={{ width: '100%', position: 'relative' }}
          image="https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {`TEST 카페 `}
            <Typography variant="h3" display="inline" color="primary.dark">
              {`2.6`}
            </Typography>
          </Typography>
          <Typography variant="body1" noWrap={false}>
            {`서울특별시 관악구`}
          </Typography>
          <Rating
            value={2.5}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarBorder style={{ opacity: 0.8 }} fontSize="inherit" />
            }
          />
        </CardContent>
      </CardActionArea>
    </CardContainer>
  );
}
