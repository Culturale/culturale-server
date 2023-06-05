import type { MongoId } from '~/types/types';

import type { IEvent } from '../event';
import type { IReview } from '../review';

import type { IUser } from './user.interface';

export type UserProps = {
  _id?: MongoId;
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
  reviews?: IReview[];
  preferits?: IEvent[];
  report?: number;
  stripeCustomerId?: string;
  contacts?: IUser[];
};

export class User implements IUser {
  public _id: MongoId;
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
  public reviews: IReview[];
  public preferits: IEvent[];
  public report: number;
  public stripeCustomerId?: string;
  public contacts: IUser[];

  constructor(props: UserProps) {
    const {
      _id,
      username,
      name,
      password,
      email,
      profilePicture,
      phoneNumber,
      usertype,
      followers,
      followeds,
      eventSub,
      reviews,
      preferits,
      report,
      stripeCustomerId,
      contacts,
    } = props;
    this._id = _id;
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
    this.reviews = reviews || [];
    this.preferits = preferits || [];
    this.report = report;
    this.stripeCustomerId = stripeCustomerId;
    this.contacts = contacts || [];
  }

  public get id(): string {
    return this._id.toString();
  }

  public updateEventSub(newEvent: IEvent): void {
    if (!this.eventSub.find((eventSub) => eventSub.id === newEvent.id)) {
      const newEvents = [...this.eventSub, newEvent];
      this.eventSub = newEvents;
    }
  }

  public deleteEventSub(newEvent: IEvent): void {
    const updatedEvents = this.eventSub.filter(
      (eventSub) => eventSub.id !== newEvent.id,
    );
    this.eventSub = updatedEvents;
  }

  public updateValoracions(newReview: IReview): void {
    const reviews = [...this.reviews, newReview];
    this.reviews = reviews;
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
    const updatedFollowers = this.followers.filter(
      (follower) => follower.id !== newFollower.id,
    );
    this.followers = updatedFollowers;
  }

  public deleteFolloweds(newUser: IUser): void {
    const updatedFolloweds = this.followeds.filter(
      (followed) => followed.id !== newUser.id,
    );
    this.followeds = updatedFolloweds;
  }
  public updateEventPref(newEvent: IEvent): void {
    if (!this.preferits.find((preferit) => preferit.id === newEvent.id)) {
      const newEvents = [...this.preferits, newEvent];
      this.preferits = newEvents;
    }
  }

  public setStripeCustomerId(id: string): void {
    this.stripeCustomerId = id;
  }

  public deleteFavourite(newEvent: IEvent): void {
    const updatedEvents = this.preferits.filter(
      (preferits) => preferits.id !== newEvent.id,
    );
    this.preferits = updatedEvents;
  }

  public updateContacts(newContacts: IUser[]): void {
    newContacts.forEach((newContact) => {
      const existingContact = this.contacts.find((contact) => contact.id === newContact.id);
      if (!existingContact) {
        this.contacts.push(newContact);
      }
    });
  }
  

  public get followersUsernames(): string[] {
    const ids = this.followers.map((follower) => follower.username);
    return ids;
  }
}
