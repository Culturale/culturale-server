import type { Request, Response } from 'express';

import { EventController } from '../../controllers/event-controller/event-controller';


export async function signUp(req: Request, res: Response) {
    try {
        // create new user
        await EventController.addParticipant(req, res);

        res.status(201).json({
            message: 'User created successfully',
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}