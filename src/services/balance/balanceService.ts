import { MockService } from '../mock/mockService';
import { useAuthStore } from '../../store/auth/authStore';

export interface BalanceResponse {
  currency: string;
  accountBalance: number;
}

export class BalanceService {
  static async getBalance(): Promise<BalanceResponse> {
    const user = useAuthStore.getState().user;

    if (!user) {
      throw new Error('Usuário não autenticado');
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
      throw new Error(response.message || 'Erro ao buscar saldo');
    }
  }
}
