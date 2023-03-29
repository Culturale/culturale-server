/* eslint-disable no-console */
//import { ObjectId } from "mongodb";
import type { IChat } from '~/domain/entities/chat';
import { Chat } from '~/domain/entities/chat';
import { ChatModel } from '~/domain/entities/chat';
import type { IMessage } from '~/domain/entities/message/message.interface';

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
  public static async getMessages(chatId: IChat): Promise<IMessage> {
    const chat = await ChatModel.findById(chatId.toString()).populate(
      'messages'
    );
    console.log(chat);
    const messagesChat = chat.toObject().messages;
    const messageValues = new Chat(chat.toObject()._id, messagesChat);
    console.log(messageValues.messages[16].toString());
    const content = await MessageRepository.getMessage(messageValues.messages[0].toString());
    console.log(content);
    return content;
  }
}
