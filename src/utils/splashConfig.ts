import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const splashConfig = {
  animation: {
    fadeInDuration: 800,
    fadeOutDuration: 500,
    scaleStart: 0.8,
    scaleEnd: 1,
    springTension: 50,
    springFriction: 7,
    displayTime: 2000,
  },

  layout: {
    logo: {
      fontSize: width > 400 ? 56 : 48,
      marginBottom: 20,
    },
    tagline: {
      fontSize: width > 400 ? 20 : 18,
    },
  },

  colors: {
    light: {
      primary: '#5b6bff',
      surface: '#ffffff',
      accent: '#e0e9ff',
    },
    dark: {
      primary: '#2f2f85',
      surface: '#ffffff',
      accent: '#e0e9ff',
    },
  },

  timing: {
    minDisplayTime: 1500,
    maxDisplayTime: 3000,
  },
};
