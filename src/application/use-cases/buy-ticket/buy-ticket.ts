import type { Request, Response } from 'express';

import { StripeService } from '~/infrastructure/services';
import { BuyTicketDto } from '~/infrastructure';
import { EventRepository } from '~/domain/repositories';
import { getActor } from '~/utils';

export async function buyTicket(req: Request, res: Response) {
  try {
    const buyTicketDto: BuyTicketDto = req.body;
    const { eventId } = buyTicketDto;

    const event = await EventRepository.findEvent(eventId);
    const user = await getActor(req);

    const stripe = new StripeService();

    const paymentIntent = await stripe.createPayment(
      user.stripeCustomerId,
      parseFloat(event.price),
      'eur',
    );

    const ephemeralKey = await stripe.createEphemeralKey(user.stripeCustomerId);

    res.status(200).json({
      message: 'Payment intent created successfully',
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey,
      customer: user.stripeCustomerId,
      publishableKey:
        'pk_test_51NATp9IdIcZ9qhZBJTgkQxqerAysKhRFXH4B7FYG0P5zW6SaBgCVXRiALMs5i9ZGeYV0WxZlFoSFGSdbC7lUwzOy00AHnoBtlG',
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}
