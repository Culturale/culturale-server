import { IsString, IsNotEmpty } from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

class DeleteUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export async function deleteUserDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new DeleteUserDto();
  DTO.id = req.params.id;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
