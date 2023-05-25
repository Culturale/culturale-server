import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserRepository } from '~/domain/repositories';

export async function logIn(req: Request, res: Response): Promise<void> {
  res.setHeader('Content-Type', 'application/json');
  try {
    const user = await UserRepository.findByUsername(req.body.username);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (isPasswordCorrect) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ token: token, user: user });
      } else {
        res.status(400).json({ error: 'Incorrect password' });
      }
    } else {
      res.status(400).json({
        message: `Username ${req.body.username} not found`,
      });
    }
  } catch (e) {
    res.status(500);
    res.json({
      error: e,
    });
  }
}
