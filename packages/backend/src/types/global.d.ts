declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_DB_URL: string;
    GOOGLE_CREDENTIALS: string;
  }
}