import { UserController } from "../../controllers/user-controller/user-controller";
import { Request, Response } from 'express';

export function signUp (req: Request, res: Response): void {
    // create new user
    UserController.createUser(req, res);
}
