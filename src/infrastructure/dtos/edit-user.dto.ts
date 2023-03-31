import { IsString, IsNotEmpty, IsEmail , IsOptional } from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class EditUserDTO {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string ;

    @IsOptional()
    @IsString()
    name: string ;

    @IsOptional()
    @IsString()
    profilePicture: string ;

    @IsOptional()
    @IsString()
    phoneNumber: string;
    
  
}

export async function editUserDTO(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const DTO = new EditUserDTO();
  
  DTO.username = req.body.username;
  DTO.email = req.body.email;
  DTO.password = req.body.password;
  DTO.name = req.body.name;
  DTO.profilePicture = req.body.profilePicture;
  DTO.phoneNumber = req.body.phoneNumber;


  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
