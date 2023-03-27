import { IsString, IsNotEmpty } from "class-validator";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export async function loginDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new LoginDto();
  DTO.username = req.body.username;
  DTO.password = req.body.password;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
