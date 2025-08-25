import { TransferService } from '../../../src/services/transfer/transferService';

describe('TransferService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransfer', () => {
    it('should create transfer successfully', async () => {
      const transferData = {
        value: 100,
        currency: 'BRL',
        payeerDocument: '12345678901',
        payeerName: 'João Silva',
        transferDate: '2024-01-15',
        description: 'Pagamento de serviço',
      };

      const result = await TransferService.createTransfer(transferData);

      expect(result).toMatchObject({
        status: 'success',
        transferId: expect.any(String),
        message: 'Transferência realizada com sucesso',
      });
      expect(result.transferId).toBeDefined();
    });

    it('should validate required fields', async () => {
      const invalidData = {
        value: 0,
        currency: 'BRL',
        payeerDocument: '',
        payeerName: '',
        transferDate: '',
        description: '',
      };

      await expect(
        TransferService.createTransfer(invalidData)
      ).rejects.toThrow();
    });
  });

  describe('getTransfers', () => {
    it('should return list of transfers', async () => {
      const result = await TransferService.getTransfers();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('value');
      expect(result[0]).toHaveProperty('payeer');
    });
  });
});
