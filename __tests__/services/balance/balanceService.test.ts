import { BalanceService } from '../../../src/services/balance/balanceService';

jest.mock('../../../src/store', () => ({
  store: {
    getState: () => ({
      auth: {
        user: { id: '1', balance: 5000 },
      },
    }),
  },
}));

describe('BalanceService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBalance', () => {
    it('should return user balance successfully', async () => {
      const result = await BalanceService.getBalance();

      expect(result).toEqual({
        currency: 'BRL',
        accountBalance: 5000,
      });
    });
  });
});
