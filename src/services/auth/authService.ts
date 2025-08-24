import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { MOCK_USERS } from '../mock/mockData';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response.data;
    } catch (error) {
      return this.mockLogin(credentials);
    }
  }

  private static mockLogin(credentials: LoginRequest): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          resolve({
            token: `mock-jwt-token-${user.id}`,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  }
}
