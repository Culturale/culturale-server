import { Schema, model } from 'mongoose';

import type { IUser } from './user.interface';

const UserSchema = new Schema({
  email: { required: true, type: String, unique: true },
  username: { required: true, type: String, unique: true },
  password: { required: true, type: String },
});

const UserModel = model<IUser>('User', UserSchema);

export { UserModel };
