export const MOCK_USERS = [
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

export const MOCK_TRANSFERS = [
  {
    id: 1,
    value: 500.0,
    date: '2024-01-15',
    currency: 'BRL',
    payeer: {
      document: '123.456.789-00',
      name: 'João Silva',
    },
  },
  {
    id: 2,
    value: 1200.0,
    date: '2024-01-10',
    currency: 'BRL',
    payeer: {
      document: '987.654.321-00',
      name: 'Maria Santos',
    },
  },
];
