import type { MongoId } from '~/types/types';

import type { IChat } from '../chat';
import type { IReview } from '../review';
import type { IUser } from '../user';

import type { IEvent } from './event.interface';

export type Categoria =
  | 'agenda:categories/activitats-virtuals'
  | 'agenda:categories/exposicions'
  | 'agenda:categories/concerts'
  | 'agenda:categories/teatre'
  | 'agenda:categories/festivals-i-mostres'
  | 'agenda:categories/rutes-i-visites'
  | 'agenda:categories/infantil'
  | 'agenda:categories/festes'
  | 'agenda:categories/conferencies'
  | 'agenda:categories/fires-i-mercats'
  | 'agenda:categories/dansa'
  | 'agenda:categories/cicles';


export type EventProps = {
  _id?: MongoId;
  codi: number;
  denominacio: string;
  descripcio: string;
  dataIni: Date;
  dataFi: Date;
  horari: string;
  adress: string;
  lat: number;
  long: number;
  price?: string;
  url?: string;
  photo?: string;
  chat?: IChat;
  participants?: IUser[];
  valoracions?: IReview[];
  categoria: Categoria;
};

export class Event implements IEvent {
  public _id: MongoId;
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
  public valoracions: IReview[];
  public categoria: Categoria;

  constructor(props: EventProps) {
    const {
      _id,
      codi,
      denominacio,
      descripcio,
      dataIni,
      dataFi,
      horari,
      adress,
      valoracions,
      lat,
      long,
      price,
      url,
      photo,
      chat,
      participants,
      categoria,
    } = props;
    this._id = _id;
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
    this.valoracions = valoracions || [];
    this.categoria = categoria;
  }

  public addParticipant(newParticipant: IUser): void {
    const newParticipants = [...this.participants, newParticipant];
    this.participants = newParticipants;
  }

  public deleteParticipant(newParticipant: IUser): void {
    const updatedParticipants = this.participants.filter(
      (participants) => participants.id !== newParticipant.id,
    );

    this.participants = updatedParticipants;
  }

  public get participantsUsernames(): string[] {
    const ids = this.participants.map((participant) => participant.username);
    return ids;
  }

  public updateValoracions(newValoracio: IReview): void {
    const newValoracions = [...this.valoracions, newValoracio];
    this.valoracions = newValoracions;
  }

  public get id(): string {
    return this._id.toString();
  }
}
