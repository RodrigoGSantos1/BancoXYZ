import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MoneyInput } from '../../../src/components/forms/MoneyInput';

describe('MoneyInput', () => {
  it('should format initial value correctly', () => {
    const { getByDisplayValue } = render(
      <MoneyInput label="Valor" value={1000} onValueChange={() => {}} />
    );

    expect(getByDisplayValue('10,00')).toBeTruthy();
  });

  it('should handle user input correctly', () => {
    const onValueChange = jest.fn();
    const { getByPlaceholderText } = render(
      <MoneyInput
        label="Valor"
        value={0}
        onValueChange={onValueChange}
        placeholder="0,00"
      />
    );

    const input = getByPlaceholderText('0,00');

    fireEvent.changeText(input, '1');
    expect(onValueChange).toHaveBeenCalledWith(1);

    fireEvent.changeText(input, '10');
    expect(onValueChange).toHaveBeenCalledWith(10);

    fireEvent.changeText(input, '100');
    expect(onValueChange).toHaveBeenCalledWith(100);
  });

  it('should handle empty input', () => {
    const onValueChange = jest.fn();
    const { getByPlaceholderText } = render(
      <MoneyInput
        label="Valor"
        value={0}
        onValueChange={onValueChange}
        placeholder="0,00"
      />
    );

    const input = getByPlaceholderText('0,00');

    fireEvent.changeText(input, '');
    expect(onValueChange).toHaveBeenCalledWith(0);
  });
});
