export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface BalanceResponse {
  currency: string;
  accountBalance: number;
}

export interface TransferRequest {
  value: number;
  currency: string;
  payeerDocument: string;
  payeerName: string;
  transferDate: string;
}

export interface TransferResponse {
  status: 'success' | 'error';
  transferId?: string;
  message?: string;
}

export interface TransferItem {
  id: number;
  value: number;
  date: string;
  currency: string;
  payeer: {
    document: string;
    name: string;
  };
}
