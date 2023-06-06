import { IsString, IsNotEmpty } from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class BuyTicketDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;
}

export async function buyTicketDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new BuyTicketDto();
  DTO.eventId = req.body.eventId;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
