import { MockService } from '../mock/mockService';

import { LoginRequest, LoginResponse } from '../../types';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const mockUser = MockService.getMockUser(credentials.email);

    if (mockUser && mockUser.password === credentials.password) {
      const response: LoginResponse = {
        token: `mock-jwt-token-${mockUser.id}`,
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
        },
      };

      const mockResponse = await MockService.simulateApiCall(response, 1000);

      if (mockResponse.success) {
        return mockResponse.data;
      } else {
        throw new Error('Erro no login');
      }
    } else {
      throw new Error('Credenciais inválidas');
    }
  }
}
