import { Request, Response } from 'express';

import { UserController } from '../../controllers/user-controller/user-controller';


export async function signUp(req: Request, res: Response) {
    try {
        // create new user
        await UserController.createUser(req, res);

        res.status(201).json({
            message: 'User created successfully',
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}