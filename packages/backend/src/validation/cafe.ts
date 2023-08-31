import { object, string } from 'yup';

export const createCafeBodySchema = object({
  title: string().required(),
  address: string().required(),
});
