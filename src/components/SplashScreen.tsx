import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { splashConfig } from '../utils/splashConfig';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const theme = useTheme();
  const colors = theme.state.colors;

  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(
    () => new Animated.Value(splashConfig.animation.scaleStart),
    []
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: splashConfig.animation.fadeInDuration,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: splashConfig.animation.scaleEnd,
        tension: splashConfig.animation.springTension,
        friction: splashConfig.animation.springFriction,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: splashConfig.animation.fadeOutDuration,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, splashConfig.animation.displayTime);

    return () => clearTimeout(timer);
  }, [onFinish, fadeAnim, scaleAnim]);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text
          style={[
            styles.logo,
            {
              color: colors.primary[500],
              fontSize: splashConfig.layout.logo.fontSize,
              marginBottom: splashConfig.layout.logo.marginBottom,
            },
          ]}
        >
          BancoXYZ
        </Text>
        <Text
          style={[
            styles.tagline,
            {
              color: colors.primary[100],
              fontSize: splashConfig.layout.tagline.fontSize,
            },
          ]}
        >
          Seu banco digital
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  tagline: {
    fontWeight: '500',
    fontFamily: 'System',
  },
});
