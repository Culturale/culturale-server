import { IsNotEmpty, IsNumber, IsString, IsDate} from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';


class CreateMessageDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  codi: Number;

  @IsNumber()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export async function createMessageDto(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const DTO = new CreateMessageDto();
  DTO.date = req.body.date;
  DTO.codi = req.body.codi;
  DTO.userId = req.body.userId;
  DTO.content = req.body.content;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}