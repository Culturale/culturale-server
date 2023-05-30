import type { Request, Response } from 'express';

import { UserController } from '~/application/controllers';


export async function like(req: Request, res: Response) {
    try {
        // like event
        await UserController.addFavourite(req, res);

        res.status(200).json({
            message: 'Event added successfully',
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}