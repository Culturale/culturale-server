import type { Request, Response } from 'express';

import { EventController } from '~/application/controllers';


export async function deleteReview(req: Request, res: Response) {
    try {
        // subscribe user
        await EventController.deleteReview(req, res);

        res.status(200).json({
            message: 'Review delete successfully',
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}