import { searchPlaceApi } from '@lib/searchApi';

type SearchPlaceService = ({
  query,
}: {
  query: string;
}) => Promise<Place[] | []>;

interface Place {
  title: string;
  address: string;
  roadAddress: string;
}

export const searchPlaceService: SearchPlaceService = async ({
  query,
}: {
  query: string;
}) => {
  const originalPlace = await searchPlaceApi({ query });

  const place = originalPlace.items
    .filter((v) => v.category.indexOf('카페') !== -1)
    .map((v) => ({
      title: v.title.replaceAll(/<b>|<\/b>/g, ''),
      address: v.address,
      roadAddress: v.roadAddress,
    }));

  return place;
};
