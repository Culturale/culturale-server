import { Request, Response } from 'express';
import { UserModel } from '~/domain/entities/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function logIn(req: Request, res: Response): Promise<void> {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (isPasswordCorrect) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: 'Incorrect password' });
      }
    }
    res.status(400).json({
      message: `Username ${req.body.username} not found`,
    });
  } catch (e) {
    res.status(500);
    res.json({
      error: e,
    });
  }
}
