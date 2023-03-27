import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

export class EditParamDTO {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    email: string | null;

    @IsString()
    password: string | null;
    
  
}

export async function editParamDTO(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new EditParamDTO();
  
  DTO.username = req.body.username;
  DTO.email = req.body.email;
  DTO.password = req.body.password;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
