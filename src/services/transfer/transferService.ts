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
    data: TransferRequest,
    userEmail: string,
    userId: number
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

    const currentBalance = await MockService.getMockUserBalance(userEmail);
    if (currentBalance < data.value) {
      throw new ValidationError(
        'Saldo insuficiente para realizar a transferência',
        {
          balance: currentBalance,
          value: data.value,
        }
      );
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
      await MockService.updateUserBalance(userEmail, data.value, 'debit');
      await MockService.addTransfer(userId, {
        value: data.value,
        date: data.transferDate,
        currency: data.currency,
        payeer: {
          document: data.payeerDocument,
          name: data.payeerName,
        },
      });
      return response.data;
    } else {
      throw new TransferError('Erro ao criar transferência', { response });
    }
  }

  static async getTransfers(userId: number): Promise<TransferItem[]> {
    const userTransfers = MockService.getUserTransfers(userId);

    const response = await withRetry(
      () => MockService.simulateApiCall(userTransfers, 600),
      { maxAttempts: 3, delayMs: 1000 }
    );

    if (response.success) {
      return response.data;
    } else {
      throw new NetworkError('Erro ao buscar transferências', { response });
    }
  }
}
