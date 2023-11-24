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

interface CafeCardProps {
  cafeId: string;
  imageUrl: string;
  title: string;
  rating: number;
  address: string;
}

export function CafeCard({
  cafeId,
  imageUrl,
  title,
  rating,
  address,
}: CafeCardProps) {
  return (
    <CardContainer>
      <CardActionArea component={RouterLink} to={`/cafe/${cafeId}`}>
        <CardMedia
          component="img"
          sx={{ width: '100%', height: '200px', position: 'relative' }}
          image={imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {`${title} `}
            <Typography variant="h3" display="inline" color="primary">
              {rating.toFixed(1)}
            </Typography>
          </Typography>
          <Typography variant="body1" noWrap={false}>
            {address}
          </Typography>
          <Rating
            value={rating}
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
