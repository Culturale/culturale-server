import { Schema, model } from "mongoose";

import type { IUser } from "./user.interface";

const UserSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    usertype: { type: String, required: true }
});

const UserModel = model<IUser>("User", UserSchema);

export { UserModel };
