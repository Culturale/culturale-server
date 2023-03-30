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
  public latitud: number;
  public longitud: number;
  public categoria: string;
  public telefon: number;
  public aforament: number;
  public Nasis: number;
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
    latitud: number,
    longitud: number,
    categoria: string,
    telefon: number,
    aforament: number,
    Nasis: number,
    chat: IChat,
  ) {
    this.id = id;
    this.codi = codi;
    this.denominacio = denominacio;
    this.descripcio= descripcio;
    this.dataIni = dataIni;
    this.dataFi = dataFi;
    this.horari = horari;
    this.adress = adress;
    this.url = url;
    this.latitud = latitud;
    this.longitud = longitud;
    this.categoria = categoria;
    this.telefon = telefon;
    this.aforament = aforament;
    this.Nasis = Nasis;
    this.chat = chat;
  }
}
