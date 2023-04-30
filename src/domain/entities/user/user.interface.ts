import type { MongoId } from '~/types/types';

export interface IUser {
    id: MongoId;
    username: string;
    name: string;
    password: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    usertype: string;
    followers: IUser[];

    updateFollowers: (newFollower: IUser) => void;
}


