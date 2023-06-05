import type Stripe from 'stripe';

type currency = 'eur';
export interface IStripe {
  createCustomer: (
    email: string,
    name: string,
    phone: string,
  ) => Promise<string>;

  createPayment: (
    customerId: string,
    amount: number,
    currency: currency,
  ) => Promise<Stripe.PaymentIntent>;

  createEphemeralKey: (customerId: string) => Promise<string>;

  constructEvent: (request: any, signature: string | string[]) => Stripe.Event;
}
