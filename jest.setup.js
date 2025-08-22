// Jest setup file
import 'react-native-gesture-handler/jestSetup';

// Mock expo modules
jest.mock('expo-modules-core', () => {
  const mockModule = {
    EventEmitter: jest.fn(),
    NativeModule: jest.fn(),
    SharedObject: jest.fn(),
    SharedRef: jest.fn(),
  };
  return mockModule;
});

// Mock expo status bar
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock react native reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock nativewind
jest.mock('nativewind', () => ({
  styled: jest.fn((component) => component),
  useColorScheme: jest.fn(() => 'light'),
}));

// Global mocks
global.__reanimatedWorkletInit = jest.fn();
