import { IsString, IsNotEmpty } from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    current_password: string ;

    @IsString()
    @IsNotEmpty()
    new_password: string;
}

export async function changePasswordDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new ChangePasswordDto();

  DTO.current_password = req.body.current_password;
  DTO.new_password = req.body.new_password;


  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
