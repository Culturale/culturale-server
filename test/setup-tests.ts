import dotenv from 'dotenv';

dotenv.config({
  path: '../.env',
});

jest.mock('bcrypt', () => ({
  compare: (password1: string, password2: string) => password1 === password2,
  hash: (password: string, _security: number) => password,
}));

jest.setTimeout(30000);
