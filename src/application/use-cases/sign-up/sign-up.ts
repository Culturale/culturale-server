import { UserController } from "../../controllers/user-controller/user-controller";
import { createUserDto } from "~/infrastructure/dtos/create-user.dto";
import { Request, Response } from 'express';

export async function signUp(req: Request, res: Response): Promise<void> {
    // create new user
    try {
        createUserDto(req, res, async () => await UserController.createUser(req, res));
    } catch (e) {
        res.status(500);
        res.json({
            error: e,
        });
    }
}