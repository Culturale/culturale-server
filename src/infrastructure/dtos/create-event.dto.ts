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

class CreateEventDto {
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

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(180)
  longitud: Number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(90)
  latitud: Number;

  @IsString()
  @IsNotEmpty()
  categoria: String;

  @IsNumber()
  @IsNotEmpty()
  @Min(600000000)
  @Max(999999999)
  telefon: Number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  aforament: Number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  Nasis: Number;
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
  DTO.latitud = Number(req.body.latitud);
  DTO.longitud = Number(req.body.longitud);
  DTO.categoria = req.body.categoria;
  DTO.telefon = Number(req.body.telefon);
  DTO.aforament = Number(req.body.aforament);
  DTO.Nasis = Number(req.body.Nasis);

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
