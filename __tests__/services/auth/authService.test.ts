import { AuthService } from '../../../src/services/auth/authService';

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
