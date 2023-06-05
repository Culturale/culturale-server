import type Stripe from 'stripe';

export async function paymentSucceeded(
  paymentIntent: Stripe.Event.Data.Object,
) {
  console.log('payment succeeded use case');
  console.log(paymentIntent);
}
