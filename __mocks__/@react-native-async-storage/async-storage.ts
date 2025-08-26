const mockStorage: { [key: string]: string } = {};

export default {
  setItem: jest.fn((key: string, value: string) => {
    return new Promise((resolve) => {
      mockStorage[key] = value;
      resolve(null);
    });
  }),
  getItem: jest.fn((key: string) => {
    return new Promise((resolve) => {
      resolve(mockStorage[key] || null);
    });
  }),
  removeItem: jest.fn((key: string) => {
    return new Promise((resolve) => {
      delete mockStorage[key];
      resolve(null);
    });
  }),
  clear: jest.fn(() => {
    return new Promise((resolve) => {
      Object.keys(mockStorage).forEach((key) => {
        delete mockStorage[key];
      });
      resolve(null);
    });
  }),
};
