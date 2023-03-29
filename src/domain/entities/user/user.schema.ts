import { Schema, model } from "mongoose";

import type { IUser } from "./user.interface";

const UserSchema = new Schema({
    name: { required: true, type: String },
    username: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    phoneNumber: { required: true, type: String },
    profilePicture: { required: true, type: String },
    usertype: { required: true, type: String }
});

const UserModel = model<IUser>("User", UserSchema);

export { UserModel };
