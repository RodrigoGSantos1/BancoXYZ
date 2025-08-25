import { MockService } from '../mock/mockService';
import { LoginRequest, LoginResponse } from '../../types';
import { AuthenticationError, ValidationError } from '../../errors/AppError';

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
        throw new AuthenticationError('Erro no login', {
          response: mockResponse,
        });
      }
    } else {
      throw new ValidationError('Credenciais inválidas', {
        email: credentials.email,
      });
    }
  }
}
