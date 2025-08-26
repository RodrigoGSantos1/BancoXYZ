import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MoneyInput } from '../../../src/components/forms/MoneyInput';

describe('MoneyInput', () => {
  const mockProps = {
    label: 'Valor',
    value: 15.0,
    onValueChange: jest.fn(),
    error: undefined,
    placeholder: 'Digite um valor',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label and value', () => {
    const { getByText, getByDisplayValue } = render(
      <MoneyInput {...mockProps} />
    );

    expect(getByText('Valor')).toBeTruthy();
    expect(getByDisplayValue('15,00')).toBeTruthy();
  });

  it('formats value correctly', () => {
    const { getByDisplayValue } = render(
      <MoneyInput {...mockProps} value={1500.75} />
    );

    expect(getByDisplayValue('1.500,75')).toBeTruthy();
  });

  it('calls onValueChange with correct value when typing', () => {
    const { getByDisplayValue } = render(<MoneyInput {...mockProps} />);
    const input = getByDisplayValue('15,00');

    fireEvent.changeText(input, '123456');
    expect(mockProps.onValueChange).toHaveBeenCalledWith(1234.56);
  });

  it('handles zero value correctly', () => {
    const { getByDisplayValue } = render(
      <MoneyInput {...mockProps} value={0} />
    );
    const input = getByDisplayValue('0,00');

    fireEvent.changeText(input, '2000');
    expect(mockProps.onValueChange).toHaveBeenCalledWith(20.0);
  });

  it('shows error message when error prop is provided', () => {
    const { getByText } = render(
      <MoneyInput {...mockProps} error="Valor inválido" />
    );

    expect(getByText('Valor inválido')).toBeTruthy();
  });

  it('shows placeholder when value is 0', () => {
    const { getByPlaceholderText } = render(
      <MoneyInput {...mockProps} value={0} />
    );

    expect(getByPlaceholderText('Digite um valor')).toBeTruthy();
  });
});
