import { MockService } from '../mock/mockService';

export interface TransferRequest {
  value: number;
  currency: string;
  payeerDocument: string;
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

export class TransferService {
  static async createTransfer(
    _data: TransferRequest
  ): Promise<TransferResponse> {
    const mockData: TransferResponse = {
      status: 'success',
      transferId: `TRF-${Date.now()}`,
      message: 'Transferência realizada com sucesso',
    };

    const response = await MockService.simulateApiCall(mockData, 1200);

    if (response.success) {
      return response.data;
    } else {
      throw new Error('Erro ao criar transferência');
    }
  }

  static async getTransfers(): Promise<TransferItem[]> {
    const mockData: TransferItem[] = [
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

    const response = await MockService.simulateApiCall(mockData, 600);

    if (response.success) {
      return response.data;
    } else {
      throw new Error('Erro ao buscar transferências');
    }
  }
}
