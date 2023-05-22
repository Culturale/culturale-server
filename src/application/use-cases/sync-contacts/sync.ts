import type { Request, Response } from 'express';

import { UserController } from '~/application/controllers';


export async function sync(req: Request, res: Response) {
    try {
        // subscribe user
        await UserController.syncContacts(req, res);

        res.status(200).json({
            message: 'Contacts synced successfully',
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}