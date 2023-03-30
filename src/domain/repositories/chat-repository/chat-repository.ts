import type { IChat } from '~/domain/entities/chat';
import { Chat } from '~/domain/entities/chat';
import { ChatModel } from '~/domain/entities/chat';
import type { IMessage } from '~/domain/entities/message';

import { MessageRepository } from '../message-repository/message-repository';


export class ChatRepository {
  public static async createEmptyChat(): Promise<IChat> {
    const chatDocument = await ChatModel.create({ messages: [] });
    const chatObject = chatDocument.toObject();
    return new Chat(chatObject._id, chatObject.messages);
  }
  public static async addMessage(
    chatId: IChat,
    message: IMessage
  ): Promise<Chat> {
    const chat = await ChatModel.findById(chatId);
    chat.messages.push(message);
    const updatedChat = await chat.save();
    return updatedChat;
  }
  public static async getMessages(chatId: IChat): Promise<IMessage[]> {
    const chat = await ChatModel.findById(chatId.toString()).populate(
      'messages'
    );
    
    const messagesChat = chat.toObject().messages;
    const chatValues = new Chat(chat.toObject()._id, messagesChat);

    const resultMessage: IMessage[] = [];
    for(let i = 0; i < chatValues.messages.length; i++){
      const content1 = await MessageRepository.getMessage(chatValues.messages[i].toString());
      resultMessage.push(content1);
    }
    return resultMessage;
  }
}
