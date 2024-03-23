export type OrderBy = 'asc' | 'desc';

export interface RequestPaging {
  limit: number;
  offset: number;
}

export interface ResponsePaging {
  limit: number;
  offset: number;
  total: number;
}
