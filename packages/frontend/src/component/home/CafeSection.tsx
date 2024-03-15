import { Box, Typography } from '@mui/material';
import { CafeCard } from 'component';
import { Cafe } from 'model';
import { FlexBox } from 'style';

export function CafeSection({ cafeList }: { cafeList: Cafe[] }) {
  return (
    <>
      <Typography variant="h2" color="primary" paddingX="5.625rem">
        최근 추가된 카페
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
