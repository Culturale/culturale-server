import type { IEvent } from "./event.interface";

export class Event implements IEvent {
  public id: string;
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

  constructor (
    id: string,
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
  ) {
    this.id = id;
    this.denominacio = denominacio;
    this.descripcio = descripcio;
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
  }
}
