import { IsString, IsNotEmpty, validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class AddFavouriteDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export async function addFavouriteDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new AddFavouriteDto();
  DTO.id = req.body.id;
  DTO.username = req.body.username;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
