import { registerAs } from '@nestjs/config';

export const thirdPartyConfiguration = registerAs('third-party', () => ({
  naver_client_id: process.env.THIRD_PARTY_NAVER_CLIENT_ID,
  naver_client_secret: process.env.THIRD_PARTY_NAVER_CLIENT_SECRET,
  ncp_apigw_api_key_id: process.env.THIRD_PARTY_NCP_APIGW_API_KEY_ID,
  ncp_apigw_api_key: process.env.THIRD_PARTY_NCP_APIGW_API_KEY,
}));
