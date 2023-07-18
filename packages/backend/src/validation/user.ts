import { object, string } from 'yup';

export const createUserBodySchema = object({
  displayName: string().required(),
});
