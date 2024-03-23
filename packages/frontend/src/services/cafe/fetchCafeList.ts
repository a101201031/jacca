import { fetcher } from 'helper';
import type { Cafe } from 'model';
import { getAccessToken } from 'services/getAccessToken';
import type { OrderBy, RequestPaging, ResponsePaging } from 'types';

interface FetchCafeParams {
  sortBy: '_id' | 'rating' | 'title';
  orderBy: OrderBy;
  paging: RequestPaging;
}

interface FetchCafeResponse {
  data: Cafe[];
  paging: ResponsePaging;
}

export async function fetchCafeList({
  paging: { limit, offset },
  sortBy,
  orderBy,
}: FetchCafeParams) {
  const accessToken = await getAccessToken();
  return await fetcher.get<FetchCafeResponse>({
    path: '/cafes',
    queryParams: { limit, offset, sortBy, orderBy },
    accessToken,
  });
}
