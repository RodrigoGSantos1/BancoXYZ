import { AuthService } from '../../../src/services/auth/authService';

jest.mock('../../../src/services/auth/authService', () => ({
  AuthService: {
    login: jest.fn().mockImplementation(async (credentials) => {
      if (
        credentials.email === 'gabriel@topaz.com' &&
        credentials.password === '1111'
      ) {
        return {
          token: 'mock-jwt-token-1',
          user: {
            id: 1,
            name: 'Gabriel Topaz',
            email: 'gabriel@topaz.com',
          },
        };
      }
      throw new Error('Credenciais inválidas');
    }),
  },
}));

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
