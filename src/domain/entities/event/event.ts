import type { IEvent } from "./event.interface";

export class Event implements IEvent {
  public id: string;
  public denominacio: string;
  public descripcio: string;
  public dataIni: Date;
  public dataFi: Date;
  public horari: String;
  public adress: String;
  public url: String;
  public latitud: Number;
  public longitud: Number;
  public categoria: String;
  public telefon: Number;
  public aforament: Number;
  public Nasis: Number;

  constructor (
    id: string,
    denominacio: string,
    descripcio: string,
    dataIni: Date,
    dataFi: Date,
    horari: String,
    adress: String,
    url: String,
    latitud: Number,
    longitud: Number,
    categoria: String,
    telefon: Number,
    aforament: Number,
    Nasis: Number,
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
