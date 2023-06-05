import type { MongoId } from '~/types/types';

import type { IEvent } from '../event';
import type { IReview } from '../review';

export interface IUser {
  _id: MongoId;
  username: string;
  name: string;
  password: string;
  email: string;
  profilePicture: string;
  phoneNumber: string;
  usertype: string;
  followers?: IUser[]; //gente q me sigue
  followeds?: IUser[]; //gente a la que sigo
  eventSub?: IEvent[];
  reviews?: IReview[];
  preferits?: IEvent[];
  report: number;
  stripeCustomerId?: string;
  contacts?: IUser[];

  updateEventSub: (newEvent: IEvent) => void;
  deleteEventSub: (newEvent: IEvent) => void;
  updateValoracions: (review: IReview) => void;
  updateFollowers: (newFollower: IUser) => void;
  updateFolloweds: (newFollowed: IUser) => void;
  deleteFollowers: (follower: IUser) => void;
  deleteFolloweds: (followed: IUser) => void;
  updateEventPref: (newEvent: IEvent) => void;
  setStripeCustomerId: (id: string) => void;
  updateContacts: (newContact: IUser[]) => void;

  readonly id: string;
}
