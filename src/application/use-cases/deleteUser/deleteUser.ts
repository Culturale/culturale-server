import type { Request, Response } from 'express';

import { UserController } from '~/application/controllers';


export async function deleteUser(req: Request, res: Response) {
    try {
        // subscribe user
        await UserController.deleteUser(req, res);

        res.status(200).json({
            message: 'User delete successfully',
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}