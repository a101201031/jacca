export interface Cafe {
  _id: string;
  title: string;
  address: string;
  roadAddress: string;
  location: {
    type: string;
    coordinates: number[];
    _id: string;
  };
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  cafeInfo?: {};
  images: {
    title: string;
    url: string;
    _id: string;
  }[];
  tags: CafeTag[];
}

interface CafeTag {
  _id: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CafeListApiRes {
  data: {
    _id: string;
    title: string;
    address: string;
    roadAddress: string;
    rating: number;
    images: { _id: string; title: string; url: string }[];
    tags: string[];
  }[];
  paging: {
    limit: number;
    offset: number;
    total: number;
  };
}
