import { Schema, model } from "mongoose";

import type { IUser } from "./user.interface";

const UserSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilepicture: { type: String, required: true },
    phone: { type: String, required: true }
});

const UserModel = model<IUser>("User", UserSchema);

export { UserModel };
