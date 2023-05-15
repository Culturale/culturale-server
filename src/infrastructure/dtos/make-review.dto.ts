import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean} from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class MakeReviewDTO {
    @IsString()
    @IsNotEmpty()
    eventId: string;
  
    @IsNotEmpty()
    @IsString()
    authorId: string ;

    @IsNotEmpty()
    @IsNumber()
    puntuation: number ;

    @IsOptional()
    @IsString()
    comment: string;

    @IsOptional()
    @IsBoolean()
    report: boolean;

}

export async function makeReviewDTO(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new MakeReviewDTO();
  
  DTO.eventId = req.body.eventId;
  DTO.comment = req.body.comment;
  DTO.authorId = req.body.authorId;
  DTO.puntuation = req.body.puntuation;
  DTO.report = false;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors, message:' Not the correct parameters for MakeReview DTO' });
    return;
  }

  next();
}

