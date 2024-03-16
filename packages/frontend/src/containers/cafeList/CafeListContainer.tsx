import { CafeCard } from 'component';
import { useRecoilValue } from 'recoil';
import { cafeListSelector } from 'store';

export function CafeListContainer() {
  const cafeList = useRecoilValue(cafeListSelector);
  return (
    <>
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
    </>
  );
}
