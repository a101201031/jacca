import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ThirdPartyConfigService {
  constructor(private configService: ConfigService) {}

  get naver_client_id(): string {
    return this.configService.get<string>('third-party.naver_client_id');
  }

  get naver_client_secret(): string {
    return this.configService.get<string>('third-party.naver_client_secret');
  }

  get ncp_apigw_api_key_id(): string {
    return this.configService.get<string>('third-party.ncp_apigw_api_key_id');
  }

  get ncp_apigw_api_key(): string {
    return this.configService.get<string>('third-party.ncp_apigw_api_key');
  }
}
