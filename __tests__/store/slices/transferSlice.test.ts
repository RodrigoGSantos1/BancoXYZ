import transferReducer, {
  fetchTransfersStart,
  fetchTransfersSuccess,
  fetchTransfersFailure,
  createTransferStart,
  createTransferSuccess,
  createTransferFailure,
  updateFilters,
  clearFilters,
} from '../../../src/store/slices/transferSlice';

describe('transferSlice', () => {
  const initialState = {
    transfers: [],
    isLoading: false,
    error: null,
    filters: {
      search: '',
      minValue: 0,
      maxValue: 0,
      startDate: null,
      endDate: null,
    },
  };

  it('should handle initial state', () => {
    expect(transferReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchTransfersStart', () => {
    const actual = transferReducer(initialState, fetchTransfersStart());
    expect(actual.isLoading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle fetchTransfersSuccess', () => {
    const mockTransfers = [
      {
        id: 1,
        value: 100,
        date: '2024-01-15',
        currency: 'BRL',
        payeer: {
          document: '123.456.789-00',
          name: 'Test User',
        },
      },
    ];

    const actual = transferReducer(
      initialState,
      fetchTransfersSuccess(mockTransfers)
    );

    expect(actual.transfers).toEqual(mockTransfers);
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(null);
  });

  it('should handle fetchTransfersFailure', () => {
    const errorMessage = 'Failed to fetch transfers';
    const actual = transferReducer(
      initialState,
      fetchTransfersFailure(errorMessage)
    );

    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(errorMessage);
  });

  it('should handle createTransferStart', () => {
    const actual = transferReducer(initialState, createTransferStart());
    expect(actual.isLoading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle createTransferSuccess', () => {
    const mockTransfer = {
      id: 1,
      value: 100,
      date: '2024-01-15',
      currency: 'BRL',
      payeer: {
        document: '123.456.789-00',
        name: 'Test User',
      },
    };

    const actual = transferReducer(
      initialState,
      createTransferSuccess(mockTransfer)
    );

    expect(actual.transfers[0]).toEqual(mockTransfer);
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(null);
  });

  it('should handle createTransferFailure', () => {
    const errorMessage = 'Failed to create transfer';
    const actual = transferReducer(
      initialState,
      createTransferFailure(errorMessage)
    );

    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(errorMessage);
  });

  it('should handle updateFilters', () => {
    const newFilters = {
      search: 'test',
      minValue: 100,
      maxValue: 1000,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
    };

    const actual = transferReducer(initialState, updateFilters(newFilters));
    expect(actual.filters).toEqual(newFilters);
  });

  it('should handle clearFilters', () => {
    const stateWithFilters = {
      ...initialState,
      filters: {
        search: 'test',
        minValue: 100,
        maxValue: 1000,
        startDate: '2024-01-01',
        endDate: '2024-01-31',
      },
    };

    const actual = transferReducer(stateWithFilters, clearFilters());
    expect(actual.filters).toEqual(initialState.filters);
  });
});
