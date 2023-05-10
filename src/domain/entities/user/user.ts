import type { MongoId } from '~/types/types';

import type { IEvent } from '../event';


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
    followers?: IUser[];
    followeds?: IUser[];
    eventSub?: IEvent[];
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
    public followers: IUser[];
    public followeds: IUser[];
    public eventSub: IEvent[];

    constructor(props: UserProps) {
        const {id, username, name, password, email, profilePicture, phoneNumber, usertype, followers, followeds, eventSub} = props;
        this.id = id;
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.profilePicture = profilePicture;
        this.phoneNumber = phoneNumber;
        this.usertype = usertype;
        this.followers = followers || [];
        this.followeds = followeds || [];
        this.eventSub = eventSub || [];
    }
    
    public updateEventSub (newEvent: IEvent): void {
        if (!this.eventSub.find((eventSub) => eventSub.id === newEvent.id)) {
        const newEvents = [...this.eventSub, newEvent];
        this.eventSub = newEvents;
        }
    }

    public deleteEventSub (newEvent: IEvent): void{
        const updatedEvents = this.eventSub.filter(eventSub => eventSub.id !== newEvent.id);
        this.eventSub = updatedEvents;
    }

    public updateFollowers(newFollower: IUser): void {
        if (!this.followers.find((follower) => follower.id === newFollower.id)) {
        const newFollowers = [...this.followers, newFollower];
        this.followers = newFollowers;
        }
    }

    public updateFolloweds(newUser: IUser): void {
        if (!this.followeds.find((followed) => followed.id === newUser.id)) {
            const newFolloweds = [...this.followeds, newUser];
            this.followeds = newFolloweds;
          }
    }

    public deleteFollowers(newFollower: IUser): void {
        const updatedFollowers = this.followers.filter(follower => follower.id !== newFollower.id);
        this.followers = updatedFollowers;
    }

    public deleteFolloweds(newUser: IUser): void {
        const updatedFolloweds = this.followeds.filter(followed => followed.id !== newUser.id);
        this.followeds = updatedFolloweds;
    }

    public get followersUsernames(): string[] {
        const ids = this.followers.map((follower) => follower.username);
        return ids;
    }
}
