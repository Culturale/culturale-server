import { UserController } from "../../controllers/user-controller/user-controller";
import { createUserDto } from "~/infrastructure/dtos/create-user.dto";
import { Request, Response } from 'express';

export function signUp (req: Request, res: Response): void {
    // create new user
    createUserDto(req, res, async() => await UserController.createUser(req, res));
    ;
}
