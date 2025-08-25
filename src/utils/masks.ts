export const masks = {
  formatCurrencyInput: (value: string): string => {
    const numericValue = value.replace(/\D/g, '').padStart(3, '0');
    const length = numericValue.length;
    const integerPart = numericValue.slice(0, length - 2);
    const decimalPart = numericValue.slice(length - 2);

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedInteger},${decimalPart}`;
  },

  currencyToNumber: (value: string): number => {
    if (!value || value.trim() === '') {
      return 0;
    }
    const numericValue = value.replace(/\D/g, '');
    if (numericValue === '') {
      return 0;
    }
    return parseInt(numericValue, 10) / 100;
  },

  cpf: (value: string): string => {
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length <= 3) {
      return numericValue;
    }
    if (numericValue.length <= 6) {
      return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
    }
    if (numericValue.length <= 9) {
      return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
    }
    return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
  },

  cpfToNumber: (value: string): string => value.replace(/\D/g, ''),
};
