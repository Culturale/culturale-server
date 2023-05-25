import {
  IsString,
  IsNotEmpty,
  IsDate,
  Max,
  IsNumber,
  Min,
  IsIn,
} from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

import type{ Categoria } from '~/domain/entities/event';

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
  @IsNotEmpty()
  horari: string;

  @IsString()
  @IsNotEmpty()
  adress: string;

  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  long: number;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsString()
  @IsIn([
    'agenda:categories/activitats-virtuals',
    'agenda:categories/exposicions',
    'agenda:categories/concerts',
    'agenda:categories/teatre',
    'agenda:categories/festivals-i-mostres',
    'agenda:categories/rutes-i-visites',
    'agenda:categories/infantil',
    'agenda:categories/festes',
    'agenda:categories/conferencies',
    'agenda:categories/fires-i-mercats',
    'agenda:categories/dansa',
    'agenda:categories/cicles',
  ])
  categoria: Categoria;

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
  DTO.lat = req.body.lat;
  DTO.long = req.body.long;
  DTO.price = req.body.price;
  DTO.url = req.body.url;
  DTO.photo = req.body.photo;
  DTO.categoria = req.body.categoria;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}