import type { Request, Response } from 'express';

import { EventRepository } from '~/domain/repositories';
import type { BuyTicketDto } from '~/infrastructure';
import { StripeService } from '~/infrastructure/services';
import { getActor } from '~/utils';

function getValueOfEuros(price: string) {
  const euroValueRegex = /€(\d+(\.\d{1,2})?)/g;
  const matches = price.match(euroValueRegex);

  if (matches) {
    const euroValues = matches.map((match: string) => {
      const valueString = match.slice(1); // Remove the euro symbol
      return parseFloat(valueString);
    });

    return euroValues;
  } else {
    return [];
  }
}

export async function buyTicket(req: Request, res: Response) {
  try {
    const buyTicketDto: BuyTicketDto = req.body;
    const { eventId } = buyTicketDto;

    const event = await EventRepository.findEvent(eventId);
    const user = await getActor(req);

    const stripe = new StripeService();

    const euroValues = getValueOfEuros(event.price);
    const price = euroValues[0] * 100;

    const paymentIntent = await stripe.createPayment(
      user.stripeCustomerId,
      price,
      'eur',
      {
        eventId,
        userId: user.id,
      },
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
