import { IsArray, ValidateNested, validate, IsString } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';


export class SyncContactDto {
  @IsArray()
  @ValidateNested({ each: true })
  contacts: PhoneNumber[];
}

export class PhoneNumber {
  @IsString()
  phoneNumber: string;
}

export async function syncContactDto(req: Request, res: Response, next: NextFunction) {
  const DTO = new SyncContactDto();
  DTO.contacts = req.body.contacts;

  const errors = await validate(DTO);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  next();
}
