export const API_ENDPOINTS = {
  AUTH: {
    LOGIN:
      'https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login',
  },
  BALANCE: {
    GET: 'https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance',
  },
  TRANSFER: {
    CREATE:
      'https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer',
    LIST: 'https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList',
  },
} as const;
