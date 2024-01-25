import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { thirdPartyConfiguration } from './third-party-configuration';
import { ThirdPartyConfigService } from './third-party-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [thirdPartyConfiguration],
    }),
  ],
  providers: [ConfigService, ThirdPartyConfigService],
  exports: [ConfigService, ThirdPartyConfigService],
})
export class ThirdPartyConfigModule {}
