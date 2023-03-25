import { UserController } from "../../controllers/user-controller/user-controller";
import { createUserDto } from "~/infrastructure/dtos/create-user.dto";
import { Request, Response } from 'express';

export async function signUp(req: Request, res: Response) {
    try {
        // create new user
        await createUserDto(req, res, () => { });
        await UserController.createUser(req, res);

        res.status(201).json({
            message: "User created successfully",
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}