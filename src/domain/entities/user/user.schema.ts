import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModel = model('User', UserSchema);

export { UserModel };
