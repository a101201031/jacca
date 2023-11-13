export interface Review {
  _id: string;
  userId: {
    _id: string;
    displayName: string;
  };
  cafeId: string;
  score: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
