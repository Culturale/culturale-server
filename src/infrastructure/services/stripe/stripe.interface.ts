export interface IStripe {
  createCustomer: (
    email: string,
    name: string,
    phone: string,
  ) => Promise<string>;
}
