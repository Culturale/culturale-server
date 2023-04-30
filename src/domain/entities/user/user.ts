import type { MongoId } from '~/types/types';


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

    constructor(props: UserProps) {
        const {id, username, name, password, email, profilePicture, phoneNumber, usertype, followers} = props;
        this.id = id;
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.profilePicture = profilePicture;
        this.phoneNumber = phoneNumber;
        this.usertype = usertype;
        this.followers = followers || [];
    }
    
    public updateFollowers(newFollower: IUser): void {
        const newFollowers = [...this.followers, newFollower];
        this.followers = newFollowers;
    }
    public get followersUsernames(): string[] {
        const ids = this.followers.map((follower) => follower.username);
        return ids;
    }
}
