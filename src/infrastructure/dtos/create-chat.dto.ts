import { IsEmpty } from "class-validator";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

import type { IMessage } from "~/domain/entities/message/message.interface";

class CreateChatDto {
  @IsEmpty()
  messages: IMessage[];
}

export async function createChatDto(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const DTO = new CreateChatDto();
  DTO.messages = req.body.messages;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
