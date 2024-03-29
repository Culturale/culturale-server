import { Schema, model } from 'mongoose';

import type { IUser } from './user.interface';

const UserSchema = new Schema({
  name: { required: true, type: String },
  username: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String },
  phoneNumber: { required: true, type: String },
  profilePicture: { required: true, type: String },
  usertype: { required: true, type: String },
  followers: [{ required: false, type: Schema.Types.ObjectId, model: 'User' }],
  followeds: [{ required: false, type: Schema.Types.ObjectId, model: 'User' }],
  eventSub: [{ required: false, type: Schema.Types.ObjectId, model: 'Event' }],
  reviews: [{ required: false, type: Schema.Types.ObjectId, model: 'Review' }],
  preferits: [{ required: false, type: Schema.Types.ObjectId, model: 'Event' }],
  report: { required: true, type: Number, default: 0 },
  stripeCustomerId: { required: false, type: String },
  tickets: [{ required: false, type: String }],
  contacts: [{ required: false, type: Schema.Types.ObjectId, model: 'User' }],

});

const UserModel = model<IUser>('User', UserSchema);

export { UserModel };
