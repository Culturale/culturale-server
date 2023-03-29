import {
  IsString,
  IsNotEmpty,
  IsDate,
} from "class-validator";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

class CreateEventDto {
  @IsNotEmpty()
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
  horari: String;

  @IsString()
  adress: String;

  @IsString()
  @IsNotEmpty()
  url: String;
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
