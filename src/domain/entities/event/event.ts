import type { MongoId } from '~/types/types';

import type { IChat } from '../chat';

import type { IEvent } from './event.interface';

export class Event implements IEvent {
  public id: MongoId;
  public codi: number;
  public denominacio: string;
  public descripcio: string;
  public dataIni: Date;
  public dataFi: Date;
  public horari: string;
  public adress: string;
  public url: string;
  public chat: IChat;

  constructor(
    id: MongoId,
    codi: number,
    denominacio: string,
    descripcio: string,
    dataIni: Date,
    dataFi: Date,
    horari: string,
    adress: string,
    url: string,
    chat: IChat
  ) {
    this.id = id;
    this.codi = codi;
    this.denominacio = denominacio;
    this.descripcio = descripcio;
    this.dataIni = dataIni;
    this.dataFi = dataFi;
    this.horari = horari;
    this.adress = adress;
    this.url = url;
    this.chat = chat;
  }
}
