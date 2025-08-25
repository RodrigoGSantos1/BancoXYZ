import { MockService } from '../mock/mockService';
import { TransferRequest, TransferResponse, TransferItem } from '../../types';
import {
  TransferError,
  ValidationError,
  NetworkError,
} from '../../errors/AppError';
import { withRetry } from '../../utils/retry';

export class TransferService {
  static async createTransfer(
    data: TransferRequest
  ): Promise<TransferResponse> {
    if (!data.value || data.value <= 0) {
      throw new ValidationError('Valor deve ser maior que zero', {
        value: data.value,
      });
    }

    if (!data.currency || data.currency.trim() === '') {
      throw new ValidationError('Moeda é obrigatória', {
        currency: data.currency,
      });
    }

    if (!data.payeerDocument || data.payeerDocument.trim() === '') {
      throw new ValidationError('Documento do beneficiário é obrigatório', {
        document: data.payeerDocument,
      });
    }

    if (!data.transferDate || data.transferDate.trim() === '') {
      throw new ValidationError('Data da transferência é obrigatória', {
        date: data.transferDate,
      });
    }

    const mockData: TransferResponse = {
      status: 'success',
      transferId: `TRF-${Date.now()}`,
      message: 'Transferência realizada com sucesso',
    };

    const response = await withRetry(
      () => MockService.simulateApiCall(mockData, 1200),
      { maxAttempts: 3, delayMs: 1000 }
    );

    if (response.success) {
      return response.data;
    } else {
      throw new TransferError('Erro ao criar transferência', { response });
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

    const response = await withRetry(
      () => MockService.simulateApiCall(mockData, 600),
      { maxAttempts: 3, delayMs: 1000 }
    );

    if (response.success) {
      return response.data;
    } else {
      throw new NetworkError('Erro ao buscar transferências', { response });
    }
  }
}
