import type { MongoId } from '~/types/types';

import type { IChat } from '../chat';
import type { IUser } from '../user';

import type { IEvent } from './event.interface';

export type EventProps = {
  id?: MongoId;
  codi: number;
  denominacio: string;
  descripcio: string;
  dataIni: Date;
  dataFi: Date;
  horari: string;
  adress: string;
  lat: number;
  long: number;
  price: string;
  url: string;
  photo?: string;
  chat?: IChat;
  participants?: IUser[];
};

export class Event implements IEvent {
  public id: MongoId;
  public codi: number;
  public denominacio: string;
  public descripcio: string;
  public dataIni: Date;
  public dataFi: Date;
  public horari: string;
  public adress: string;
  public lat: number;
  public long: number;
  public price: string;
  public url: string;
  public photo: string;
  public chat: IChat;
  public participants: IUser[];

  constructor(props: EventProps) {
    const {id, codi, denominacio, descripcio, dataIni, dataFi, horari, adress, lat, long, price, url, photo, chat, participants} = props;
    this.id = id;
    this.codi = codi;
    this.denominacio = denominacio;
    this.descripcio = descripcio;
    this.dataIni = dataIni;
    this.dataFi = dataFi;
    this.horari = horari;
    this.adress = adress;
    this.lat = lat;
    this.long = long;
    this.price = price;
    this.url = url;
    this.photo = photo;
    this.chat = chat;
    this.participants = participants || [];
  }
  public updateParticipant(newParticipant: IUser): void {
    const newParticipants = [...this.participants, newParticipant];
    this.participants = newParticipants;
  }
  public get participantsUsernames(): string[] {
    const ids = this.participants.map((participant) => participant.username);
    return ids;
  }
}
