import { geocodeApi, searchImageApi } from '@lib/thirdPartyApi';
import type { Cafe } from '@model/cafe';
import { CafeModel } from '@model/cafe';

type ReadCafeService = ({ _id }: Pick<Cafe, '_id'>) => Promise<Cafe | null>;

type ReadCafeByTitleService = ({
  title,
}: Pick<Cafe, 'title'>) => Promise<Cafe | null>;

type CreateCafeService = ({
  title,
  address,
}: Pick<Cafe, 'title' | 'address'>) => Promise<Cafe>;

export const readCafeService: ReadCafeService = async ({ _id }) => {
  const cafe = await CafeModel.findById(_id).exec();
  return cafe;
};

export const readCafeByTitleService: ReadCafeByTitleService = async ({
  title,
}) => {
  const cafe = await CafeModel.findOne({ title }).exec();
  return cafe;
};

export const createCafeService: CreateCafeService = async ({
  title,
  address,
}) => {
  const geocodeApiRes = await geocodeApi({ query: address });
  const {
    jibunAddress,
    roadAddress,
    x: lng,
    y: lat,
  } = geocodeApiRes.addresses[0];

  const imageApiRes = await searchImageApi({ query: title });
  const images = imageApiRes.items.map((v) => ({
    title: v.title,
    url: v.link,
  }));

  const location = { type: 'Point', coordinates: [Number(lng), Number(lat)] };

  const cafe = await CafeModel.create({
    title,
    address: jibunAddress,
    roadAddress,
    location,
    images,
  });

  return cafe;
};
