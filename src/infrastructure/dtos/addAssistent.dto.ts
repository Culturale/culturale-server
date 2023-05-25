import { IsString, IsNotEmpty, validate, IsNumber } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class AddAssistentDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  user_lat: number;

  @IsNumber()
  @IsNotEmpty()
  user_long: number;
}

export async function addAssistentDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new AddAssistentDto();
  DTO.id = req.body.id;
  DTO.username = req.body.username;
  DTO.user_lat = req.body.user_lat;
  DTO.user_long = req.body.user_long;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
