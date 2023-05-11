import type { Request, Response } from 'express';

import { EventController } from '~/application/controllers';


export async function checkin(req: Request, res: Response) {
    try {
        // check-in user
        await EventController.addAssistent(req, res);

        res.status(200).json({
            message: 'User checked in successfully',
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}