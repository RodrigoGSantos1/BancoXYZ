import { MockService } from '../mock/mockService';
import { store } from '../../store';
import { BalanceResponse } from '../../types';
import { AuthenticationError, BalanceError } from '../../errors/AppError';
import { withRetry } from '../../utils/retry';

export class BalanceService {
  static async getBalance(): Promise<BalanceResponse> {
    const user = store.getState().auth.user;

    if (!user) {
      throw new AuthenticationError('Usuário não autenticado');
    }

    const mockUser = MockService.getMockUser(user.email);

    const mockData: BalanceResponse = {
      currency: 'BRL',
      accountBalance: mockUser?.balance || user.balance || 5000.0,
    };

    const response = await withRetry(
      () => MockService.simulateApiCall(mockData, 800),
      { maxAttempts: 3, delayMs: 1000 }
    );

    if (response.success) {
      return response.data;
    } else {
      throw new BalanceError(response.message || 'Erro ao buscar saldo', {
        response,
      });
    }
  }
}
