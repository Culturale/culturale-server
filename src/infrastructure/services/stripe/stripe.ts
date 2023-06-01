import Stripe from 'stripe';
import { IStripe } from './stripe.interface';

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
}
