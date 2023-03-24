import type { IEvent } from "~/domain/entities/event";
import { EventModel } from "~/domain/entities/event";

export class EventRepository {
  public static async addEvent(event: IEvent): Promise<void> {
    await EventModel.create(event);
  }

  public static async getAllEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }

  public static async getEventbydenominacio(name: String): Promise<IEvent[]> {
    return await EventModel.find({denominacio: name});
  }

  public static async getEventbydataIni(data: Date): Promise<IEvent[]> {
    return await EventModel.find({dataIni: data});
  }

  public static async getEventbydataFi(data: Date): Promise<IEvent[]> {
    return await EventModel.find({dataFi: data});
  }
}
