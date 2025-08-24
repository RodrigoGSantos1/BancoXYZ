import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { MOCK_TRANSFERS } from '../mock/mockData';

export interface TransferRequest {
  value: number;
  currency: string;
  payeerDocument: string;
  transferDate: string;
}

export interface TransferResponse {
  status: 'success' | 'error';
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

export class TransferService {
  static async createTransfer(
    data: TransferRequest
  ): Promise<TransferResponse> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.TRANSFER.CREATE,
        data
      );
      return response.data;
    } catch (error) {
      return this.mockCreateTransfer(data);
    }
  }

  static async getTransfers(): Promise<TransferItem[]> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TRANSFER.LIST);
      return response.data;
    } catch (error) {
      return this.mockGetTransfers();
    }
  }

  private static mockCreateTransfer(
    _data: TransferRequest
  ): Promise<TransferResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 'success' });
      }, 1000);
    });
  }

  private static mockGetTransfers(): Promise<TransferItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TRANSFERS);
      }, 500);
    });
  }
}
