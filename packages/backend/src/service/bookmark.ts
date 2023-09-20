import { BookmarkModel } from '@model/bookmark';

const readBookmarkService = async ({ id }) => {
  const bookmark = await BookmarkModel.findById(id).exec();
  return bookmark;
};

export const createBookmarkService = async ({ userId, cafeId }) => {
  let bookmark = await readBookmarkService(userId);
  if (!bookmark) {
    bookmark = await BookmarkModel.create({ _id: userId });
  }
  bookmark = await bookmark.updateOne({ $addToSet: { cafes: cafeId } }).exec();

  return bookmark;
};
