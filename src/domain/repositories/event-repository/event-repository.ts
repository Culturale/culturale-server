
import type { Chat, IChat } from '~/domain/entities/chat';
import type { EventProps, IEvent} from '~/domain/entities/event';
import { Event } from '~/domain/entities/event';
import { EventModel } from '~/domain/entities/event';
// import type { IUser } from '~/domain/entities/user';
import type { CreateEventDto } from '~/infrastructure';
import type { MongoId } from '~/types/types';

export class EventRepository {
  public static async addEvent(event: CreateEventDto, chatId: MongoId): Promise<IEvent> {
    const newEvent = await EventModel.create({
      ...event,
      chat: chatId,
      participants: [],
      valoracions: [],
    });
    return newEvent;
  }

  public static async deleteEvent(codi: string): Promise<void> {
    await EventModel.findByIdAndDelete(codi);
    
  }

  public static async getAllEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }

  public static async findEvent(codiEvent: string): Promise<IEvent> {
    const eventDocument = await EventModel.findOne({codi: codiEvent})
    .populate({
      path: 'participants',
      model: 'User',
    })
    ;

    if(eventDocument){
    const eventBuscat:IEvent = new Event(eventDocument as EventProps);
    return eventBuscat;
    }
    else return null;
  }

  public static async editarEvent(newEvent: IEvent): Promise<void> {
    const participants = newEvent.participants;
    const valoracions = newEvent.valoracions;
    await EventModel.findByIdAndUpdate(newEvent.id, {
      ...newEvent,
     participants,
      valoracions,
    });
  }

 
  public static async getChatEvent(codi: number): Promise<IChat | null> {
    const event = await EventModel.findOne({ codi: codi });
    if (!event) return null;
    return event.chat;
  }

  public static async modifyChatEvent(
    event: IEvent,
    chat: Chat
  ): Promise<void> {
    await EventModel.findOneAndUpdate(event, { chat: chat }, { new: true });
  }

  // public static async addParticipant(
  //   event: IEvent,
  //   user: IUser
  // ): Promise<IUser[]> {
  //   event.participants.push(user);
  //   const updatedEvent: IEvent = await EventModel.findOneAndUpdate(
  //     { _id: event.id },
  //     { $push: { participants: user } }, 
  //     { new: true } 
  //   ).populate('participants'); 
  //   return updatedEvent.participants;
  // }


}
