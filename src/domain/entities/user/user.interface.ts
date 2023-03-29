import type { MongoId } from '~/types/types';

export interface IUser {
    username: string;
    name: string;
    password: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    usertype: string;

}
