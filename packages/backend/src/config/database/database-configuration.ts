import { registerAs } from '@nestjs/config';

export const databaseConfiguration = registerAs('database-mongodb', () => ({
  uri: process.env.DATABASE_MONGODB_URI,
}));
