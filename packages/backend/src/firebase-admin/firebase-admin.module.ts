import type { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import type admin from 'firebase-admin';
import { FirebaseAdminService } from './firebase-admin.service';

@Global()
@Module({})
export class FirebaseAdminModule {
  static forRoot(options: admin.AppOptions = {}): DynamicModule {
    return {
      module: FirebaseAdminModule,
      providers: [
        {
          provide: FirebaseAdminService,
          useValue: new FirebaseAdminService(options),
        },
      ],
      exports: [FirebaseAdminService],
    };
  }
}
