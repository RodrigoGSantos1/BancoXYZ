import { MockService } from '../mock/mockService';
import { useAuthStore } from '../../store/auth/authStore';
import { BalanceResponse } from '../../types';
import { AuthenticationError, BalanceError } from '../../errors/AppError';

export class BalanceService {
  static async getBalance(): Promise<BalanceResponse> {
    const user = useAuthStore.getState().user;

    if (!user) {
      throw new AuthenticationError('Usuário não autenticado');
    }

    const mockUser = MockService.getMockUser(user.email);

    const mockData: BalanceResponse = {
      currency: 'BRL',
      accountBalance: mockUser?.balance || user.balance || 5000.0,
    };

    const response = await MockService.simulateApiCall(mockData, 800);

    if (response.success) {
      return response.data;
    } else {
      throw new BalanceError(response.message || 'Erro ao buscar saldo', {
        response,
      });
    }
  }
}
