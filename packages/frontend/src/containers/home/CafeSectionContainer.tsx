import { CafeSection } from 'component';
import { useRecoilValue } from 'recoil';
import { cafeListAtomFamily } from 'store/atom/cafe';

export function CafeSectionContainer() {
  const cafeList = useRecoilValue(cafeListAtomFamily('key'));
  return <CafeSection cafeList={cafeList} />;
}
