import Stripe from 'stripe';

import type { IStripe } from './stripe.interface';

export class StripeService implements IStripe {
  private stripeInstance;

  constructor() {
    this.stripeInstance = new Stripe(
      'sk_test_51NATp9IdIcZ9qhZBhIZK8p6JJUHQpPSzbtkwlE8V1RZhZlEDyihADekDBXUR7q6YnnevaKstb6SXteHPUHebIC9Q00hIxpqPzs',
      { apiVersion: '2022-11-15' },
    );
  }

  public async createCustomer(
    email: string,
    name: string,
    phone: string,
  ): Promise<string> {
    const res = await this.stripeInstance.customers.create({
      name,
      email,
      phone,
    });

    return res.id;
  }

  public async createPayment(
    customerId: string,
    amount: number,
    currency: 'eur',
  ): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripeInstance.paymentIntents.create({
      customer: customerId,
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent;
  }
}
