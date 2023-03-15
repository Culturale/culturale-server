import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export async function createUserDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new CreateUserDto();
  DTO.email = req.body.email;
  DTO.username = req.body.username;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
