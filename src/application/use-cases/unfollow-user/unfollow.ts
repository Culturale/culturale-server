import type { Request, Response } from 'express';

import { UserController } from '../../controllers/user-controller/user-controller';


export async function unfollow(req: Request, res: Response) {
    try {
        // create new user
        await UserController.Unfollow(req, res);

        res.status(201).json({
            message: 'User followed successfully',
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}