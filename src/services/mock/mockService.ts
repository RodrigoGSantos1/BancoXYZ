import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_USERS, MOCK_TRANSFERS } from './mockData';

export interface MockResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export class MockService {
  static async simulateApiCall<T>(
    data: T,
    delay: number = 500,
    shouldFail: boolean = false
  ): Promise<MockResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (shouldFail) {
          resolve({
            success: false,
            data: data,
            message: 'Erro simulado',
          });
        } else {
          resolve({
            success: true,
            data: data,
            message: 'Sucesso',
          });
        }
      }, delay);
    });
  }

  private static async getStoredUsers() {
    try {
      const storedUsers = await AsyncStorage.getItem('mock_users');
      return storedUsers ? JSON.parse(storedUsers) : MOCK_USERS;
    } catch {
      return MOCK_USERS;
    }
  }

  private static async getStoredTransfers() {
    try {
      const storedTransfers = await AsyncStorage.getItem('mock_transfers');
      return storedTransfers ? JSON.parse(storedTransfers) : MOCK_TRANSFERS;
    } catch {
      return MOCK_TRANSFERS;
    }
  }

  static async getMockUser(email: string) {
    const users = await this.getStoredUsers();
    return users.find((user: (typeof MOCK_USERS)[0]) => user.email === email);
  }

  static async validateCredentials(
    email: string,
    password: string
  ): Promise<boolean> {
    const users = await this.getStoredUsers();
    const foundUser = users.find(
      (user: (typeof MOCK_USERS)[0]) => user.email === email
    );
    return foundUser ? foundUser.password === password : false;
  }

  static async getMockUserBalance(email: string): Promise<number> {
    const users = await this.getStoredUsers();
    const foundUser = users.find(
      (user: (typeof MOCK_USERS)[0]) => user.email === email
    );
    return foundUser ? foundUser.balance : 0;
  }

  static async updateUserBalance(
    email: string,
    amount: number,
    operation: 'credit' | 'debit'
  ): Promise<void> {
    const users = await this.getStoredUsers();
    const userIndex = users.findIndex(
      (user: (typeof MOCK_USERS)[0]) => user.email === email
    );

    if (userIndex !== -1) {
      if (operation === 'credit') {
        users[userIndex].balance += amount;
      } else {
        users[userIndex].balance -= amount;
      }
      await AsyncStorage.setItem('mock_users', JSON.stringify(users));
    }
  }

  static async addTransfer(
    userId: number,
    transfer: Omit<(typeof MOCK_TRANSFERS)[0], 'id' | 'userId'>
  ): Promise<void> {
    const transfers = await this.getStoredTransfers();
    const newTransfer = {
      ...transfer,
      id: transfers.length + 1,
      userId,
    };
    transfers.unshift(newTransfer);
    await AsyncStorage.setItem('mock_transfers', JSON.stringify(transfers));
  }

  static async getUserTransfers(userId: number) {
    const transfers = await this.getStoredTransfers();
    return transfers.filter(
      (transfer: (typeof MOCK_TRANSFERS)[0]) => transfer.userId === userId
    );
  }
}
