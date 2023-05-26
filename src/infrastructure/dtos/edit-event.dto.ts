import {
    IsString,
    IsDate,
    Max,
    IsNumber,
    Min,
    IsOptional,
    IsIn,
  } from 'class-validator';
  import { validate } from 'class-validator';
  import type { NextFunction, Request, Response } from 'express';

  import type { Categoria } from '~/domain/entities/event';



export class EditEventDTO {
    @IsNumber()
    @Min(11111111111)
    @Max(99999999999)
    @IsOptional()
    codi: number;
  
    @IsString()
    @IsOptional()
    denominacio: string;
  
    @IsString() 
    @IsOptional()
    descripcio: string;
  
    @IsDate()
    @IsOptional()
    dataIni: Date;
  
    @IsDate()
    @IsOptional()
    dataFi: Date;
  
    @IsString()
    @IsOptional()
    horari: string;
  
    @IsString()
    @IsOptional()
    adress: string;

    @IsNumber()
    @IsOptional()
    lat: number;

    @IsNumber()
    @IsOptional()
    long: number;

    @IsString()
    @IsOptional()
    price: string;
  
    @IsString()
    @IsOptional()
    url: string;

    @IsString()
    @IsOptional()
    photo: string;

    @IsString()
    @IsOptional()
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

export async function editEventDTO(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new EditEventDTO();

  DTO.codi = req.body.codi;
  DTO.denominacio = req.body.denominacio;
  DTO.descripcio = req.body.descripcio;
  DTO.dataIni = req.body.dataIni;
  DTO.dataFi = req.body.dataFi;
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