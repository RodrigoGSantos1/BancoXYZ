import { masks } from '../../src/utils/masks';

describe('Masks', () => {
  describe('formatCurrencyInput', () => {
    it('should format currency input correctly', () => {
      expect(masks.formatCurrencyInput('100')).toBe('1,00');
      expect(masks.formatCurrencyInput('1000')).toBe('10,00');
      expect(masks.formatCurrencyInput('10000')).toBe('100,00');
      expect(masks.formatCurrencyInput('100000')).toBe('1.000,00');
    });

    it('should handle empty input', () => {
      expect(masks.formatCurrencyInput('')).toBe('0,00');
      expect(masks.formatCurrencyInput('0')).toBe('0,00');
    });
  });

  describe('currencyToNumber', () => {
    it('should convert currency string to number', () => {
      expect(masks.currencyToNumber('100')).toBe(1);
      expect(masks.currencyToNumber('1000')).toBe(10);
      expect(masks.currencyToNumber('10000')).toBe(100);
    });

    it('should handle empty input', () => {
      expect(masks.currencyToNumber('')).toBe(0);
    });
  });

  describe('cpf', () => {
    it('should format CPF correctly', () => {
      expect(masks.cpf('12345678901')).toBe('123.456.789-01');
      expect(masks.cpf('123456789')).toBe('123.456.789');
      expect(masks.cpf('123456')).toBe('123.456');
      expect(masks.cpf('123')).toBe('123');
    });

    it('should handle empty input', () => {
      expect(masks.cpf('')).toBe('');
    });
  });

  describe('cpfToNumber', () => {
    it('should remove CPF formatting', () => {
      expect(masks.cpfToNumber('123.456.789-01')).toBe('12345678901');
      expect(masks.cpfToNumber('123.456.789')).toBe('123456789');
    });
  });
});
