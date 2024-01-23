import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  private readonly adminApp: admin.app.App;

  private readonly adminAuth: admin.auth.Auth;

  constructor(options: admin.AppOptions) {
    this.adminApp = admin.initializeApp(options);
    this.adminAuth = this.adminApp.auth();
  }

  async verifyIdToken(token: string) {
    const decodedIdToken = await this.adminAuth.verifyIdToken(token);
    return decodedIdToken;
  }
}
