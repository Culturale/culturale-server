import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        const payload = jwt.verify(token, process.env.SECRET);
        if (payload) {
          next();
        } else {
          res.status(401).json({ error: 'token verification failed' });
        }
      } else {
        res.status(401).json({ error: 'malformed auth header' });
      }
    } else {
      res.status(401).json({ error: 'No authorization header' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
