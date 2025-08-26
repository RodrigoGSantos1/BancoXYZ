import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BalanceCard } from '../../../src/components/home/BalanceCard';
import { AuthProvider } from '../../../src/providers/AuthProvider';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    isAuthenticated: true,
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      balance: 1500.75,
      accountNumber: '1234-5678-9012-3456',
    },
    token: 'test-token',
    isLoading: false,
    error: null,
  },
});

describe('BalanceCard', () => {
  it('renders correctly with balance and account number', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BalanceCard />
        </AuthProvider>
      </Provider>
    );

    expect(getByText('Saldo disponível')).toBeTruthy();
    expect(getByText('BRL 1.500,75')).toBeTruthy();
    expect(getByText('1234-5678-9012-3456')).toBeTruthy();
  });

  it('toggles balance visibility when eye icon is pressed', () => {
    const { getByText, queryByText, getByTestId } = render(
      <Provider store={store}>
        <AuthProvider>
          <BalanceCard />
        </AuthProvider>
      </Provider>
    );

    const balanceText = 'BRL 1.500,75';
    const hiddenBalance = '••••••';

    expect(getByText(balanceText)).toBeTruthy();
    expect(queryByText(hiddenBalance)).toBeFalsy();

    const toggleButton = getByTestId('toggle-balance-visibility');
    fireEvent.press(toggleButton);

    expect(queryByText(balanceText)).toBeFalsy();
    expect(getByText(hiddenBalance)).toBeTruthy();
  });

  it('shows balance when toggled back to visible', () => {
    const { getByText, queryByText, getByTestId } = render(
      <Provider store={store}>
        <AuthProvider>
          <BalanceCard />
        </AuthProvider>
      </Provider>
    );

    const balanceText = 'BRL 1.500,75';
    const hiddenBalance = '••••••';
    const toggleButton = getByTestId('toggle-balance-visibility');

    fireEvent.press(toggleButton);
    expect(getByText(hiddenBalance)).toBeTruthy();
    expect(queryByText(balanceText)).toBeFalsy();

    fireEvent.press(toggleButton);
    expect(getByText(balanceText)).toBeTruthy();
    expect(queryByText(hiddenBalance)).toBeFalsy();
  });

  it('does not render when user is not authenticated', () => {
    const unauthenticatedStore = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      },
    });

    const { queryByText } = render(
      <Provider store={unauthenticatedStore}>
        <AuthProvider>
          <BalanceCard />
        </AuthProvider>
      </Provider>
    );

    expect(queryByText('Saldo disponível')).toBeFalsy();
    expect(queryByText('Conta')).toBeFalsy();
  });
});
