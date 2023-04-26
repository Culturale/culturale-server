import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class MakeReviewDTO {
    @IsString()
    @IsNotEmpty()
    eventCode: string;
  
    @IsNotEmpty()
    @IsString()
    author: string ;

    @IsNotEmpty()
    @IsNumber()
    puntuation: number ;

    @IsOptional()
    @IsString()
    comment: string;


}

export async function makeReviewDTO(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new MakeReviewDTO();
  
  DTO.eventCode = req.body.eventCode;
  DTO.comment = req.body.comment;
  DTO.author = req.body.author;
  DTO.puntuation = req.body.puntuation;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors, message:' Not the correct parameters for MakeReview DTO' });
    return;
  }

  next();
}

