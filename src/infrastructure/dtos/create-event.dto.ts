/* eslint-disable no-octal */
import {
  IsString,
  IsNotEmpty,
  IsDate,
  Max,
  IsNumber,
  Min,
} from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class CreateEventDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(11111111111)
  @Max(99999999999)
  codi: number;

  @IsString()
  @IsNotEmpty()
  denominacio: string;

  @IsString()
  @IsNotEmpty()
  descripcio: string;

  @IsDate()
  @IsNotEmpty()
  dataIni: Date;

  @IsDate()
  @IsNotEmpty()
  dataFi: Date;

  @IsString()
  horari: string;

  @IsString()
  adress: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export async function createEventDto(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const DTO = new CreateEventDto();
  DTO.codi = req.body.codi;
  DTO.denominacio = req.body.denominacio;
  DTO.descripcio = req.body.descripcio;
  DTO.dataIni = new Date(req.body.dataIni);
  DTO.dataFi = new Date(req.body.dataFi);
  DTO.horari = req.body.horari;
  DTO.adress = req.body.adress;
  DTO.url = req.body.url;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
