import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModel = model<IUser>('User', UserSchema);

export { UserModel };
