import { geocodeApi, searchImageApi } from '@lib/thirdPartyApi';
import type { Cafe } from '@model/cafe';
import { CafeModel, CafeTagModel } from '@model/cafe';

type CreateCafeService = ({
  title,
  address,
}: Pick<Cafe, 'title' | 'address'>) => Promise<Cafe>;

type ReadCafeService = ({ id }: { id: string }) => Promise<Cafe | null>;

type ReadCafeByTitleService = ({
  title,
}: Pick<Cafe, 'title'>) => Promise<Cafe | null>;

type DeleteCafeService = ({ id }: { id: string }) => Promise<void>;

type CreateCafeTagService = ({
  cafeId,
  tag,
}: {
  cafeId: string;
  tag: string;
}) => Promise<Cafe>;

export const readCafeService: ReadCafeService = async ({ id }) => {
  const cafe = await CafeModel.findById(id).populate('tags').exec();
  return cafe;
};

export const readCafeByTitleService: ReadCafeByTitleService = async ({
  title,
}) => {
  const cafe = await CafeModel.findOne({ title }).exec();
  return cafe;
};

export const readCafesService = async ({
  title,
  rating,
  tags,
  limit,
  offset,
}) => {
  const filterQuery = {
    title: title ? { $regex: new RegExp(title, 'i') } : { $exists: true },
    tags: tags.length ? { $all: tags } : { $exists: true },
    rating: { $gte: rating },
  };

  const cafes = await CafeModel.find(filterQuery)
    .skip(offset)
    .limit(limit)
    .exec();

  const total = await CafeModel.countDocuments(filterQuery).exec();

  return {
    cafes,
    total,
  };
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

export const addCafeTagService: CreateCafeTagService = async ({
  cafeId,
  tag,
}) => {
  let CafeTag = await CafeTagModel.findOne({ tag }).exec();
  if (!CafeTag) {
    CafeTag = await CafeTagModel.create({ tag });
  }

  const cafe = await CafeModel.findByIdAndUpdate(
    cafeId,
    {
      $addToSet: { tags: CafeTag },
    },
    { new: true },
  ).exec();

  return cafe;
};

export const deleteCafeService: DeleteCafeService = async ({ id }) => {
  await CafeModel.findByIdAndDelete(id);
};
