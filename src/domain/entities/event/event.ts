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

  constructor(
    id: string,
    denominacio: string,
    descripcio: string,
    dataIni: Date,
    dataFi: Date,
    horari: String,
    adress: String,
    url: String
  ) {
    this.id = id;
    this.denominacio = denominacio;
    this.descripcio = descripcio;
    this.dataIni = dataIni;
    this.dataFi = dataFi;
    this.horari = horari;
    this.adress = adress;
    this.url = url;
  }
}