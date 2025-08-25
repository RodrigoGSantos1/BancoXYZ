import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MaskedInput } from '../../../src/components/forms/MaskedInput';

const mockMask = (value: string) => `masked_${value}`;
const mockUnmask = (value: string) => value.replace('masked_', '');
const mockOnValueChange = jest.fn();

describe('MaskedInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label', () => {
    const { getByText } = render(
      <MaskedInput
        label="Test Label"
        mask={mockMask}
        unmask={mockUnmask}
        onValueChange={mockOnValueChange}
        value=""
      />
    );

    expect(getByText('Test Label')).toBeTruthy();
  });

  it('calls onValueChange when text changes', () => {
    const { getByPlaceholderText } = render(
      <MaskedInput
        label="Test"
        mask={mockMask}
        unmask={mockUnmask}
        onValueChange={mockOnValueChange}
        value=""
        placeholder="Test placeholder"
      />
    );

    const input = getByPlaceholderText('Test placeholder');
    fireEvent.changeText(input, 'test');

    expect(mockOnValueChange).toHaveBeenCalledWith('test');
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <MaskedInput
        label="Test"
        mask={mockMask}
        unmask={mockUnmask}
        onValueChange={mockOnValueChange}
        value=""
        error="This is an error message"
      />
    );

    expect(getByText('This is an error message')).toBeTruthy();
  });
});
