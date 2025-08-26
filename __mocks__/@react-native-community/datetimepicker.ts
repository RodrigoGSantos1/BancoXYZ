export default jest.fn(() => null);

export const DateTimePickerAndroid = {
  open: jest.fn(),
  dismiss: jest.fn(),
};

export type AndroidMode = 'date' | 'time';
export type AndroidDisplay = 'default' | 'spinner' | 'calendar' | 'clock';
