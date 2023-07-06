import { StyleSheet, View, Animated, Easing } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Text } from 'react-native-paper';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const CategoryCardLoading = () => {
  const opacity = useRef(new Animated.Value(0.3));

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });
  const textTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 40],
  });

  //   useEffect(() => {
  //     Animated.loop(
  //       Animated.sequence([
  //         Animated.timing(opacity.current, {
  //           toValue: 1,
  //           useNativeDriver: true,
  //           duration: 500,
  //         }),
  //         Animated.timing(opacity.current, {
  //           toValue: 0.3,
  //           useNativeDriver: true,
  //           duration: 800,
  //         }),
  //       ])
  //     ).start();
  //   }, []);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.image__wrapper,
          {
            opacity: opacity.current,
          },
        ]}
      >
        <AnimatedLG
          colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.translate__wrapper,
            {
              transform: [{ translateX: translateX }],
            },
          ]}
        />
      </Animated.View>
      <Animated.View
        style={{
          height: 20,
          width: '40%',
          backgroundColor: '#a0a0a0',
          overflow: 'hidden',
          opacity: opacity.current,
        }}
      >
        <AnimatedLG
          colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            {
              height: 20,
              width: '100%',
              transform: [{ translateX: textTranslateX }],
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

export default CategoryCardLoading;

const styles = StyleSheet.create({
  wrapper: {
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    padding: 5,
    // height: 160,
  },
  translate__wrapper: {
    width: 40,
    height: 40,
    backgroundColor: '#a0a0a0',
  },
  image__wrapper: {
    width: 40,
    borderWidth: 1,
    borderColor: '#6e6d6d',
    borderRadius: 8,
    aspectRatio: 1 / 1,
    backgroundColor: '#a0a0a0',
    overflow: 'hidden',
  },
});
