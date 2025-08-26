export interface BalanceState {
  balance: number;
  accountNumber: string;
  isLoading: boolean;
  error: string | null;
}

export interface UpdateBalancePayload {
  amount: number;
  operation: 'credit' | 'debit';
}
