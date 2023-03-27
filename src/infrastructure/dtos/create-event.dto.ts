import { IsString, IsNotEmpty, IsDate, IsNumber } from "class-validator";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

class CreateEventDto {
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

  @IsNumber()
  @IsNotEmpty()
  longitud: Number;

  @IsNumber()
  @IsNotEmpty()
  latitud: Number;

  @IsString()
  @IsNotEmpty()
  categoria: String;

  @IsNumber()
  @IsNotEmpty()
  telefon: Number;

  @IsNumber()
  @IsNotEmpty()
  aforament: Number;

  @IsNumber()
  @IsNotEmpty()
  Nasis: Number;
}

export async function createEventDto(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const DTO = new CreateEventDto();
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
