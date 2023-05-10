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
    followers: [
        { required: true, type: Schema.Types.ObjectId, model: 'User'},
      ],
    followeds: [
        { required: true, type: Schema.Types.ObjectId, model: 'User'},
      ],
    reviews: [
        { required: true, type: Schema.Types.ObjectId, model: 'Review'},
    ]
});

const UserModel = model<IUser>('User', UserSchema);

export { UserModel };
