import type { MongoId } from '~/types/types';
import { IEvent } from '../event';

export interface IUser {
    id: MongoId;
    username: string;
    name: string;
    password: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    usertype: string;
    eventsSubs: IEvent[]; //eventos a los que me he apuntado
    followers: IUser[]; //gente q me sigue
    followeds: IUser[]; //gente a la que sigo

    updateFollowers: (newFollower: IUser) => void;
    updateFolloweds: (newFollowed: IUser) => void;
    updateEventsSubs: (newEvent: IEvent) => void;
}


