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

export class EditParamDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(11111111111)
    @Max(99999999999)
    codi: number;
  
    @IsString()
    @IsOptional()
    denominacio: string | null;
  
    @IsString() 
    @IsOptional()
    descripcio: string | null;
  
    @IsDate()
    @IsOptional()
    dataIni: Date | null;
  
    @IsDate()
    @IsOptional()
    dataFi: Date | null;
  
    @IsString()
    @IsOptional()
    horari: string | null;
  
    @IsString()
    @IsOptional()
    adress: string | null;
  
    @IsString()
    @IsOptional()
    url: string | null;
}

export async function editParamDTO(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new EditParamDTO();
  
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