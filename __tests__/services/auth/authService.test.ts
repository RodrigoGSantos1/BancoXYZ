import { AuthService } from '../../../src/services/auth/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_USERS } from '../../../src/services/mock/mockData';

describe('AuthService', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.setItem('mock_users', JSON.stringify(MOCK_USERS));
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const credentials = {
        email: 'gabriel@topaz.com',
        password: '1111',
      };

      const result = await AuthService.login(credentials);

      expect(result).toEqual({
        token: 'mock-jwt-token-1',
        user: {
          id: 1,
          name: 'Gabriel Topaz',
          email: 'gabriel@topaz.com',
        },
      });
    });

    it('should fail with invalid credentials', async () => {
      const credentials = {
        email: 'invalid@email.com',
        password: 'wrongpassword',
      };

      await expect(AuthService.login(credentials)).rejects.toThrow(
        'Credenciais inválidas'
      );
    });
  });
});
