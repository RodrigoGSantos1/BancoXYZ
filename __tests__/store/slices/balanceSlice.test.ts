import balanceReducer, {
  fetchBalanceStart,
  fetchBalanceSuccess,
  fetchBalanceFailure,
  updateBalance,
} from '../../../src/store/slices/balanceSlice';

describe('balanceSlice', () => {
  const initialState = {
    balance: 0,
    accountNumber: '',
    isLoading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(balanceReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchBalanceStart', () => {
    const actual = balanceReducer(initialState, fetchBalanceStart());
    expect(actual.isLoading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle fetchBalanceSuccess', () => {
    const mockBalance = {
      balance: 1000,
      accountNumber: '1234-5678',
    };

    const actual = balanceReducer(
      initialState,
      fetchBalanceSuccess(mockBalance)
    );

    expect(actual.balance).toBe(mockBalance.balance);
    expect(actual.accountNumber).toBe(mockBalance.accountNumber);
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(null);
  });

  it('should handle fetchBalanceFailure', () => {
    const errorMessage = 'Failed to fetch balance';
    const actual = balanceReducer(
      initialState,
      fetchBalanceFailure(errorMessage)
    );

    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(errorMessage);
  });

  it('should handle updateBalance with credit operation', () => {
    const stateWithBalance = {
      ...initialState,
      balance: 1000,
    };

    const actual = balanceReducer(
      stateWithBalance,
      updateBalance({ amount: 500, operation: 'credit' })
    );

    expect(actual.balance).toBe(1500);
  });

  it('should handle updateBalance with debit operation', () => {
    const stateWithBalance = {
      ...initialState,
      balance: 1000,
    };

    const actual = balanceReducer(
      stateWithBalance,
      updateBalance({ amount: 300, operation: 'debit' })
    );

    expect(actual.balance).toBe(700);
  });
});
