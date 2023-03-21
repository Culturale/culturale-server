import type { IEvent } from "./event.interface";

export class Event implements IEvent {
  public id: string;
  public denominacio: string;
  public descripcio: string;

  constructor(id: string, denominacio: string, descripcio: string) {
    this.id = id;
    this.denominacio = denominacio;
    this.descripcio = descripcio;
  }
}
