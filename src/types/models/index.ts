export interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  accountNumber: string;
}

export interface Transfer {
  id: number;
  value: number;
  date: string;
  currency: string;
  payeer: {
    document: string;
    name: string;
  };
}
