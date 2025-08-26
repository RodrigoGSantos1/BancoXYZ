import { TransferService } from '../../../src/services/transfer/transferService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MOCK_USERS,
  MOCK_TRANSFERS,
} from '../../../src/services/mock/mockData';

describe('TransferService', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.setItem('mock_users', JSON.stringify(MOCK_USERS));
    await AsyncStorage.setItem(
      'mock_transfers',
      JSON.stringify(MOCK_TRANSFERS)
    );
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
    });
  });
});
