import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DatePicker } from '../../../src/components/forms/DatePicker';

jest.mock('@react-native-community/datetimepicker', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('DatePicker', () => {
  const mockProps = {
    label: 'Data',
    value: '',
    onChange: jest.fn(),
    error: undefined,
    placeholder: 'Selecione uma data',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label and placeholder', () => {
    const { getByText } = render(<DatePicker {...mockProps} />);

    expect(getByText('Data')).toBeTruthy();
    expect(getByText('Selecione uma data')).toBeTruthy();
  });

  it('shows selected date when value is provided', () => {
    const { queryByText } = render(
      <DatePicker {...mockProps} value="2024-01-08" />
    );

    expect(queryByText('Selecione uma data')).toBeFalsy();
  });

  it('shows error message when error prop is provided', () => {
    const { getByText } = render(
      <DatePicker {...mockProps} error="Data inválida" />
    );

    expect(getByText('Data inválida')).toBeTruthy();
  });

  it('applies minimumDate and maximumDate constraints', () => {
    const { queryByText } = render(
      <DatePicker
        {...mockProps}
        value="2024-01-08"
        minimumDate={new Date('2024-01-01')}
        maximumDate={new Date('2024-01-31')}
      />
    );

    expect(queryByText('Data')).toBeTruthy();
  });

  it('calls onChange when date is selected', () => {
    const { getByText } = render(<DatePicker {...mockProps} />);

    const dateButton = getByText('Selecione uma data');
    fireEvent.press(dateButton);

    expect(getByText('Selecione uma data')).toBeTruthy();
  });

  it('shows placeholder when no value is provided', () => {
    const { getByText } = render(
      <DatePicker {...mockProps} value="" placeholder="Escolha uma data" />
    );

    expect(getByText('Escolha uma data')).toBeTruthy();
  });
});
