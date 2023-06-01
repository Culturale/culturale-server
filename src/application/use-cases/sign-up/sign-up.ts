import type { Request, Response } from 'express';

import { UserController } from '../../controllers/user-controller/user-controller';
import { StripeService } from '~/infrastructure/services';
import { CreateUserDto } from '~/infrastructure';

export async function signUp(req: Request, res: Response) {
  try {
    const createUserDto: CreateUserDto = req.body;
    await UserController.createUser(req, res);

    const stripe = new StripeService();

    const { email, name, phoneNumber } = createUserDto;
    const stripeCustomerId = await stripe.createCustomer(
      email,
      name,
      phoneNumber,
    );
    if (stripeCustomerId) {
    }

    res.status(201).json({
      message: 'User created successfully',
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}
