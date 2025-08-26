import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('expo-linear-gradient', () => 'LinearGradient');

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

global.fetch = jest.fn();

// Mock para suprimir warnings específicos do act()
const originalError = console.error;
const originalWarn = console.warn;

beforeEach(() => {
  console.error = (...args) => {
    if (
      (typeof args[0] === 'string' &&
        args[0].includes('Warning: An update to') &&
        args[0].includes('was not wrapped in act')) ||
      args[0].includes('A worker process has failed to exit gracefully')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('useNativeDriver')) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
  jest.clearAllTimers();
});
