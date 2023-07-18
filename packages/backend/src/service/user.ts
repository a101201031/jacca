import type { User } from '@model/user';
import { UserModel } from '@model/user';

type ReadUserService = ({ _id }: Pick<User, '_id'>) => Promise<User | null>;

type CreateUserService = ({ _id, displayName, email }: User) => Promise<User>;

export const readUserService: ReadUserService = async ({ _id }) => {
  const user = await UserModel.findById(_id).exec();
  return user;
};

export const createUserService: CreateUserService = async ({
  _id,
  displayName,
  email,
}) => {
  const user = await UserModel.create({
    _id,
    displayName,
    email,
  });
  return user;
};
