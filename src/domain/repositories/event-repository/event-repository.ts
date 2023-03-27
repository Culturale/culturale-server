import type { IEvent } from "~/domain/entities/event";
import { EventModel } from "~/domain/entities/event";

export class EventRepository {
  public static async addEvent(event: IEvent): Promise<void> {
    await EventModel.create(event);
  }

  public static async getAllEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }
  public static async deleteEvent(codi: string): Promise<void> {
    await EventModel.deleteOne({id: codi });
  }
}
