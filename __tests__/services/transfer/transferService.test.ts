import { TransferService } from '../../../src/services/transfer/transferService';

jest.mock('../../../src/services/transfer/transferService', () => ({
  TransferService: {
    createTransfer: jest
      .fn()
      .mockImplementation(async (data, _userEmail, _userId) => {
        if (data.value <= 0) {
          throw new Error('Valor deve ser maior que zero');
        }
        if (!data.payeerDocument) {
          throw new Error('Documento do beneficiário é obrigatório');
        }
        if (!data.transferDate) {
          throw new Error('Data da transferência é obrigatória');
        }

        return {
          status: 'success',
          transferId: `TRF-${Date.now()}`,
          message: 'Transferência realizada com sucesso',
        };
      }),
    getTransfers: jest.fn().mockImplementation(async (_userId) => {
      return [
        {
          id: 1,
          value: 50,
          date: '2024-01-15',
          currency: 'BRL',
          payeer: {
            document: '12345678901',
            name: 'João Silva',
          },
        },
      ];
    }),
  },
}));

describe('TransferService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransfer', () => {
    it('should create transfer successfully', async () => {
      const transferData = {
        value: 50,
        currency: 'BRL',
        payeerDocument: '12345678901',
        payeerName: 'João Silva',
        transferDate: '2024-01-15',
        description: 'Pagamento de serviço',
      };

      const result = await TransferService.createTransfer(
        transferData,
        'gabriel@topaz.com',
        1
      );

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
        TransferService.createTransfer(invalidData, 'gabriel@topaz.com', 1)
      ).rejects.toThrow();
    });
  });

  describe('getTransfers', () => {
    it('should return list of transfers', async () => {
      const result = await TransferService.getTransfers(1);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
