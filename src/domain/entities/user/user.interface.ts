export interface IUser {
    username: string;
    name: string;
    password: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    usertype: string;
    followers?: IUser[];

    updateFollowers: (newFollower: IUser) => void;
}


