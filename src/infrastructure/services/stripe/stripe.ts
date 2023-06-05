import Stripe from 'stripe';

import type { IStripe } from './stripe.interface';

export class StripeService implements IStripe {
  private stripeInstance;
  private endpointSecret =
    'whsec_dc869852394bd7535de7ffba18078a99daf637532e2b8af74611bbdb80381291';

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
    metadata?: Record<string, any>,
  ): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripeInstance.paymentIntents.create({
      customer: customerId,
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
    });

    return paymentIntent;
  }

  public async createEphemeralKey(customerId: string): Promise<string> {
    const ephemeralKey = await this.stripeInstance.ephemeralKeys.create(
      {
        customer: customerId,
      },
      { apiVersion: '2022-11-15' },
    );

    return ephemeralKey.secret;
  }

  public constructEvent(
    request: any,
    signature: string | string[],
  ): Stripe.Event {
    return this.stripeInstance.webhooks.constructEvent(
      request,
      signature,
      this.endpointSecret,
    );
  }
}
