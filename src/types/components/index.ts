import { Transfer } from '../models';

export interface FormFieldProps {
  label?: string;
  error?: string;
  touched?: boolean;
}

export interface TransferItemProps {
  transfer: Transfer;
  onPress: () => void;
}

export interface TransferFiltersProps {
  onSearch: (query: string) => void;
  onFilterByValue: (min: number, max: number) => void;
  onFilterByDate: (start: string, end: string) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
  hasActiveFilters?: boolean;
}
