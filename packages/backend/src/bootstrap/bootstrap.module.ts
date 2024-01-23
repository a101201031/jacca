import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/config';
import { FirebaseAdminModule } from '@src/firebase-admin';

@Module({
  imports: [AppConfigModule, FirebaseAdminModule.forRoot()],
})
export class BootstrapModule {}
