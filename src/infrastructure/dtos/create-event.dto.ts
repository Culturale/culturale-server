import { IsString, IsNotEmpty } from "class-validator";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

class CreateEventDto {
@IsString()
  @IsNotEmpty()
  denominacio: string;

  @IsString()
  @IsNotEmpty()
  descripcio: string;
}

export async function createEventDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new CreateEventDto();
  DTO.denominacio = req.body.denominacio;
  DTO.descripcio = req.body.descripcio;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
