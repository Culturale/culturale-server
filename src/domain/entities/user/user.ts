import type { IUser } from './user.interface';

export class User implements IUser {
    public username: string;
    public name: string;
    public password: string;
    public email: string;
    public profilePicture: string;
    public phoneNumber: string;
    public usertype: string;

    constructor(username: string, name: string, password: string, email: string, profilePicture: string, phoneNumber: string, usertype: string) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.profilePicture = profilePicture;
        this.phoneNumber = phoneNumber;
        this.usertype = usertype;
    }
}
