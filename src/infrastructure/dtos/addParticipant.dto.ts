
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';
import type { ObjectId } from 'mongoose';

export class AddParticipantDto {
    @IsMongoId()
    @IsNotEmpty()
    id: ObjectId;

    @IsString()
    @IsNotEmpty()
    username: string;
}

export async function addParticipantDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new AddParticipantDto();
  DTO.id = req.body.id;
  DTO.username = req.body.username;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
