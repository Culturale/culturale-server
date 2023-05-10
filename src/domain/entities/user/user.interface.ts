import type { MongoId } from '~/types/types';
import { IReview } from '../review';

export interface IUser {
    id: MongoId;
    username: string;
    name: string;
    password: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    usertype: string;
    followers: IUser[]; //gente q me sigue
    followeds: IUser[]; //gente a la que sigo
    reviews: IReview[];

    updateValoracions: (review: IReview) => void;
    updateFollowers: (newFollower: IUser) => void;
    updateFolloweds: (newFollowed:IUser) => void;
    deleteFollowers: (follower: IUser) => void;
    deleteFolloweds: (followed:IUser) => void;
}


