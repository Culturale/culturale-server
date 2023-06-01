import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import type { IUser } from '~/domain/entities';
import { UserRepository } from '~/domain/repositories';

export async function getActor(req: Request): Promise<IUser> {
  const auth = req.headers.authorization;
  const token = auth.split(' ')[1];
  const decodedToken: JwtPayload = jwt.decode(token, {
    complete: true,
    json: true,
  });
  const username = decodedToken.payload.username;
  const creator = await UserRepository.findByUsername(username);
  return creator;
}
