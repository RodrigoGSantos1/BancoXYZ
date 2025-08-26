import { BalanceService } from '../../../src/services/balance/balanceService';

jest.mock('../../../src/store', () => ({
  store: {
    getState: () => ({
      auth: {
        user: { id: '1', email: 'test@test.com', balance: 5000 },
      },
    }),
  },
}));

jest.mock('../../../src/services/mock/mockService', () => ({
  MockService: {
    getMockUserBalance: jest.fn().mockResolvedValue(5000),
    simulateApiCall: jest
      .fn()
      .mockImplementation((data) => Promise.resolve({ success: true, data })),
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
