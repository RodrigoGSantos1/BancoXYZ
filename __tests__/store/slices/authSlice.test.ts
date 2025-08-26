import authReducer, {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} from '../../../src/store/slices/authSlice';

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginStart', () => {
    const actual = authReducer(initialState, loginStart());
    expect(actual.isLoading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle loginSuccess', () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      balance: 1000,
      accountNumber: '1234-5678',
    };
    const mockToken = 'test-token';

    const actual = authReducer(
      initialState,
      loginSuccess({ user: mockUser, token: mockToken })
    );

    expect(actual.isAuthenticated).toBe(true);
    expect(actual.user).toEqual(mockUser);
    expect(actual.token).toBe(mockToken);
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(null);
  });

  it('should handle loginFailure', () => {
    const errorMessage = 'Login failed';
    const actual = authReducer(
      initialState,
      loginFailure({ message: errorMessage })
    );

    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(errorMessage);
    expect(actual.isAuthenticated).toBe(false);
  });

  it('should handle logout', () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { id: '1', name: 'Test' },
      token: 'test-token',
      isLoading: false,
      error: null,
    };

    const actual = authReducer(loggedInState, logout());
    expect(actual).toEqual(initialState);
  });

  it('should handle clearError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Some error',
    };

    const actual = authReducer(stateWithError, clearError());
    expect(actual.error).toBe(null);
  });
});
