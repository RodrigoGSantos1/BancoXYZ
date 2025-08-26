import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { TransferFilters } from '../../../src/components/transfers/TransferFilters';

describe('TransferFilters', () => {
  const mockProps = {
    onSearch: jest.fn(),
    onFilterByValue: jest.fn(),
    onFilterByDate: jest.fn(),
    onClearFilters: jest.fn(),
    isLoading: false,
    hasActiveFilters: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input correctly', () => {
    const { getByPlaceholderText } = render(<TransferFilters {...mockProps} />);
    expect(getByPlaceholderText('Buscar por destinatário...')).toBeTruthy();
  });

  it('calls onSearch when typing in search input', () => {
    const { getByPlaceholderText } = render(<TransferFilters {...mockProps} />);
    const searchInput = getByPlaceholderText('Buscar por destinatário...');

    act(() => {
      fireEvent.changeText(searchInput, 'João');
    });
    expect(mockProps.onSearch).toHaveBeenCalledWith('João');
  });

  it('toggles advanced filters visibility', () => {
    const { getByText, queryByText, getByTestId } = render(
      <TransferFilters {...mockProps} />
    );

    expect(queryByText('Filtros Avançados')).toBeFalsy();

    act(() => {
      const filterButton = getByTestId('filter-button');
      fireEvent.press(filterButton);
    });

    expect(getByText('Filtros Avançados')).toBeTruthy();
  });

  it('calls onFilterByValue and onFilterByDate when applying filters', () => {
    const { getByText, getByTestId, getAllByDisplayValue } = render(
      <TransferFilters {...mockProps} />
    );

    act(() => {
      const filterButton = getByTestId('filter-button');
      fireEvent.press(filterButton);
    });

    act(() => {
      const valueInputs = getAllByDisplayValue('0,00');
      const minInput = valueInputs[0];
      const maxInput = valueInputs[1];

      fireEvent.changeText(minInput, '100,00');
      fireEvent.changeText(maxInput, '200,00');
    });

    act(() => {
      const applyButton = getByText('Aplicar Filtros');
      fireEvent.press(applyButton);
    });

    expect(mockProps.onFilterByValue).toHaveBeenCalled();
    expect(mockProps.onFilterByDate).toHaveBeenCalled();
  });

  it('calls onClearFilters when clearing filters', () => {
    const { getByText, getByTestId, getAllByDisplayValue } = render(
      <TransferFilters {...mockProps} hasActiveFilters={true} />
    );

    act(() => {
      const filterButton = getByTestId('filter-button');
      fireEvent.press(filterButton);
    });

    act(() => {
      const valueInputs = getAllByDisplayValue('0,00');
      const minInput = valueInputs[0];
      fireEvent.changeText(minInput, '100,00');
    });

    act(() => {
      const clearButton = getByText('Limpar Todos');
      fireEvent.press(clearButton);
    });

    expect(mockProps.onClearFilters).toHaveBeenCalled();
  });

  it('shows loading state when isLoading is true', () => {
    const { getByTestId, getAllByDisplayValue } = render(
      <TransferFilters {...mockProps} isLoading={true} />
    );

    act(() => {
      const filterButton = getByTestId('filter-button');
      fireEvent.press(filterButton);
    });

    act(() => {
      const valueInputs = getAllByDisplayValue('0,00');
      const minInput = valueInputs[0];
      fireEvent.changeText(minInput, '100,00');
    });

    const applyButton = getByTestId('apply-filters-button');
    expect(applyButton.props.accessibilityState.disabled).toBe(false);
  });

  it('shows correct button text when hasActiveFilters is true', () => {
    const { getByText, getByTestId } = render(
      <TransferFilters {...mockProps} hasActiveFilters={true} />
    );

    act(() => {
      const filterButton = getByTestId('filter-button');
      fireEvent.press(filterButton);
    });

    expect(getByText('Filtros Aplicados')).toBeTruthy();
  });

  it('disables apply button when no filters are set', () => {
    const { getByTestId } = render(<TransferFilters {...mockProps} />);

    act(() => {
      const filterButton = getByTestId('filter-button');
      fireEvent.press(filterButton);
    });

    const applyButton = getByTestId('apply-filters-button');
    expect(applyButton.props.accessibilityState.disabled).toBe(true);
  });

  it('clears search when X button is pressed', () => {
    const { getByPlaceholderText, getByText } = render(
      <TransferFilters {...mockProps} />
    );

    act(() => {
      const searchInput = getByPlaceholderText('Buscar por destinatário...');
      fireEvent.changeText(searchInput, 'João');
    });

    act(() => {
      const clearButton = getByText('✕');
      fireEvent.press(clearButton);
    });

    expect(mockProps.onSearch).toHaveBeenCalledWith('');
  });
});
