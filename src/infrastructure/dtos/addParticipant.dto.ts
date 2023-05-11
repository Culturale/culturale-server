import { IsString, IsNotEmpty, validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class AddParticipantDto {
  @IsString()
  @IsNotEmpty()
  id: string;

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
