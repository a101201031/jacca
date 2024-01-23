import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/config';
import { FirebaseAdminModule } from '@src/firebase-admin';
import { DatabaseBootstrapModule } from './database';

@Module({
  imports: [
    AppConfigModule,
    FirebaseAdminModule.forRoot(),
    DatabaseBootstrapModule,
  ],
})
export class BootstrapModule {}
