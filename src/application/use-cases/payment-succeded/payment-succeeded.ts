import type Stripe from 'stripe';

export async function paymentSucceeded(
  _paymentIntent: Stripe.Event.Data.Object,
): Promise<void> {
  return null;
}
