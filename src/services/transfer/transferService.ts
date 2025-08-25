import { MockService } from '../mock/mockService';

import { TransferRequest, TransferResponse, TransferItem } from '../../types';

export class TransferService {
  static async createTransfer(
    data: TransferRequest
  ): Promise<TransferResponse> {
    if (!data.value || data.value <= 0) {
      throw new Error('Valor deve ser maior que zero');
    }

    if (!data.currency || data.currency.trim() === '') {
      throw new Error('Moeda é obrigatória');
    }

    if (!data.payeerDocument || data.payeerDocument.trim() === '') {
      throw new Error('Documento do beneficiário é obrigatório');
    }

    if (!data.transferDate || data.transferDate.trim() === '') {
      throw new Error('Data da transferência é obrigatória');
    }

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
