import type { MongoId } from '~/types/types';

import { IEvent } from '../event';

import type { IUser } from './user.interface';

export type UserProps = {
    id?: MongoId;
    username: string;
    name: string;
    password: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    usertype: string;
    eventsSubs: IEvent[];
    followers?: IUser[];
    followeds?: IUser[];
};

  
export class User implements IUser {
    public id: MongoId;
    public username: string;
    public name: string;
    public password: string;
    public email: string;
    public profilePicture: string;
    public phoneNumber: string;
    public usertype: string;
    public eventsSubs: IEvent[];
    public followers: IUser[];
    public followeds: IUser[];

    constructor(props: UserProps) {
        const {id, username, name, password, email, profilePicture, phoneNumber, usertype, eventsSubs, followers, followeds} = props;
        this.id = id;
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.profilePicture = profilePicture;
        this.phoneNumber = phoneNumber;
        this.usertype = usertype;
        this.eventsSubs = eventsSubs || [];
        this.followers = followers || [];
        this.followeds = followeds || [];
    }

    public updateEventsSubs(newEvent: IEvent): void {
        const newEvents = [...this.eventsSubs, newEvent];
        this.eventsSubs = newEvents;
    }
    
    public updateFollowers(newFollower: IUser): void {
        const newFollowers = [...this.followers, newFollower];
        this.followers = newFollowers;
    }

    public updateFolloweds(newUser: IUser): void {
        const newFolloweds = [...this.followeds, newUser];
        this.followeds = newFolloweds;
    }
    public get followersUsernames(): string[] {
        const ids = this.followers.map((follower) => follower.username);
        return ids;
    }
}
