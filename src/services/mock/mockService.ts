import { MOCK_USERS } from './mockData';

export interface MockResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export class MockService {
  static async simulateApiCall<T>(
    data: T,
    delay: number = 500,
    shouldFail: boolean = false
  ): Promise<MockResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (shouldFail) {
          resolve({
            success: false,
            data: data,
            message: 'Erro simulado',
          });
        } else {
          resolve({
            success: true,
            data: data,
            message: 'Sucesso',
          });
        }
      }, delay);
    });
  }

  static getMockUser(email: string) {
    return MOCK_USERS.find((user) => user.email === email);
  }

  static validateCredentials(email: string, password: string): boolean {
    const foundUser = MOCK_USERS.find((user) => user.email === email);
    return foundUser ? foundUser.password === password : false;
  }

  static getMockUserBalance(email: string): number {
    const foundUser = MOCK_USERS.find((user) => user.email === email);
    return foundUser ? foundUser.balance : 0;
  }
}
