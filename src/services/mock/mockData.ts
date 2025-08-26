interface MockTransfer {
  id: number;
  value: number;
  date: string;
  currency: string;
  payeer: {
    document: string;
    name: string;
  };
  userId: number;
}

interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
  accountNumber: string;
}

let MOCK_TRANSFERS: MockTransfer[] = [];

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: 'Gabriel Topaz',
    email: 'gabriel@topaz.com',
    password: '1111',
    balance: 15000.0,
    accountNumber: '1234-5678-9012-3456',
  },
  {
    id: 2,
    name: 'Alejo Topaz',
    email: 'alejo@topaz.com',
    password: '2222',
    balance: 8500.0,
    accountNumber: '2345-6789-0123-4567',
  },
  {
    id: 3,
    name: 'Wilson Topaz',
    email: 'wilson@topaz.com',
    password: '3333',
    balance: 22000.0,
    accountNumber: '3456-7890-1234-5678',
  },
];

export { MOCK_TRANSFERS };
