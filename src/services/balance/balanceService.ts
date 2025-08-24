import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { useAuthStore } from '../../store/auth/authStore';
import { MOCK_USERS } from '../mock/mockData';

export interface BalanceResponse {
  currency: string;
  accountBalance: number;
}

export class BalanceService {
  static async getBalance(): Promise<BalanceResponse> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BALANCE.GET);
      return response.data;
    } catch (error) {
      return this.mockGetBalance();
    }
  }

  private static mockGetBalance(): Promise<BalanceResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = useAuthStore.getState().user;
        const mockUser = MOCK_USERS.find(
          (u) => u.id === parseInt(user?.id || '1', 10)
        );

        resolve({
          currency: 'BRL',
          accountBalance: mockUser?.balance || 0,
        });
      }, 500);
    });
  }
}
