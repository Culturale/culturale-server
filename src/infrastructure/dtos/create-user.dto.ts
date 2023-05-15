import { IsString, IsEmail, IsNotEmpty, IsIn, IsBoolean, IsOptional } from 'class-validator';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';


const usertypes = ['usuario', 'empresa'] as const;

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    profilePicture: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
        
    @IsString()
    @IsNotEmpty()
    @IsIn(usertypes)
    usertype: string;

    @IsBoolean()
    @IsOptional()
    report: boolean;

}

export async function createUserDto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
    const DTO = new CreateUserDto();
    DTO.username = req.body.username;
    DTO.name = req.body.name;
    DTO.password = req.body.password;
    DTO.email = req.body.email;
    DTO.profilePicture = req.body.profilePicture;
    DTO.phoneNumber = req.body.phoneNumber;
    DTO.usertype = req.body.usertype;
    DTO. report = false;

    const errors = await validate(DTO);
    if (errors.length) {
    res.status(400).json({ errors });
    return;
    }

    next();
}
