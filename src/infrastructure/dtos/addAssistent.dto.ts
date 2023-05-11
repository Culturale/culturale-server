import { IsString, IsNotEmpty, validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class AddAssistentDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export async function addAssistentDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new AddAssistentDto();
  DTO.id = req.body.id;
  DTO.username = req.body.username;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
