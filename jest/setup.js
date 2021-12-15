// /* eslint-disable import/no-extraneous-dependencies */

global.fetch = require('jest-fetch-mock');

jest.mock('expo-modules-core', () => {});
jest.mock('expo-font', () => {});
jest.mock('@expo/vector-icons', () => {});
jest.mock('react-native-paper', () => {});
jest.mock('expo-splash-screen', () => {});

jest.mock('react-native', () => ({
  NativeModules: {
    RNPasscodeStatus: {
      supported: jest.fn(),
      status: jest.fn(),
      get: jest.fn(),
    },
  },
  Dimensions: {
    get: jest.fn().mockReturnValue({width: 100, height:100}),
  },
  StyleSheet: {
    create: () => ({}),
  },
  Platform: {
    OS: jest.fn(() => 'android'),
    version: jest.fn(() => 25),
    select: jest.fn(),
  },
  Easing: {
    inOut: jest.fn(),
  },
  ViewPropTypes: {
    style: {},
  },
  Keyboard: {
    dismiss: jest.fn(),
  },
}));



jest.mock('react-native-safe-area-context', () => ({}));

