import { IsString, IsNotEmpty } from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class FollowDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  follower: string;
}

export async function followDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new FollowDto();
  DTO.username = req.body.username;
  DTO.follower = req.body.follower;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
