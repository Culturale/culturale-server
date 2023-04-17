import type { Request, Response } from 'express';

import { EventController } from '~/application/controllers';


export async function subscribe(req: Request, res: Response) {
    try {
        // subscribe user
        await EventController.addParticipant(req, res);

        res.status(200).json({
            message: 'User subscribed successfully',
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}