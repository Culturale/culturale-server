import {
    IsString,
    IsNotEmpty,
    IsDate,
    Max,
    IsNumber,
    Min,
    IsOptional
  } from 'class-validator';
  import { validate } from 'class-validator';
  import type { NextFunction, Request, Response } from 'express';

export class EditEventDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(11111111111)
    @Max(99999999999)
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
  
    @IsString()
    @IsOptional()
    url: string;
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
  DTO.url = req.body.url;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}