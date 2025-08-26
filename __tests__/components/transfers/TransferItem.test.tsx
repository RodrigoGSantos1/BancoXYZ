import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TransferItem } from '../../../src/components/transfers/TransferItem';

describe('TransferItem', () => {
  const mockTransfer = {
    id: 1,
    value: 1500.75,
    date: '2024-01-15',
    currency: 'BRL',
    payeer: {
      document: '123.456.789-00',
      name: 'João Silva',
    },
  };

  it('renders transfer details correctly', () => {
    const { getByText } = render(
      <TransferItem transfer={mockTransfer} onPress={jest.fn()} />
    );

    expect(getByText('João Silva')).toBeTruthy();
    expect(getByText('CPF: 123.456.789-00')).toBeTruthy();
    expect(getByText('-R$ 1.500,75')).toBeTruthy();
    expect(getByText('14/01/2024')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <TransferItem transfer={mockTransfer} onPress={mockOnPress} />
    );

    const transferItem = getByText('João Silva').parent?.parent?.parent?.parent;
    fireEvent.press(transferItem);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
