declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_DB_URL: string;
    GOOGLE_CREDENTIALS: string;
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
    NCP_APIGW_API_KEY_ID: string;
    NCP_APIGW_API_KEY: string;
  }
}
