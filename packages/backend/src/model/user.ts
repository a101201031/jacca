import { Schema, model } from 'mongoose';

export interface User {
  _id: string;
  displayName: string;
  email: string;
}

const UserSchema = new Schema<User>(
  {
    _id: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = model('user', UserSchema);
