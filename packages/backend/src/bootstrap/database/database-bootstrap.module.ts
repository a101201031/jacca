import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfigModule, DatabaseConfigService } from '@src/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: async (config: DatabaseConfigService) => ({
        uri: config.uri,
      }),
    }),
  ],
})
export class DatabaseBootstrapModule {}
