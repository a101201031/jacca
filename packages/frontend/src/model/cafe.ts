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
