import { IsString, IsNotEmpty } from "class-validator";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

export class EditParamDTO {
    @IsString()
    @IsNotEmpty()
    oldParam: string;
    
    @IsNotEmpty()
    @IsString()
    newParam: string;

    @IsNotEmpty()
    @IsString()
    tipusAtribut: string;

  
}

export async function editParamDTO(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new EditParamDTO();
  DTO.oldParam = req.body.oldParam;
  DTO.newParam = req.body.newParam;
  DTO.tipusAtribut = req.body.tipusAtribut;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
