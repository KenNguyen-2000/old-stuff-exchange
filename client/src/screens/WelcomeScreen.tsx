import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MySafeArea from '../components/MySafeArea';

interface IWelcomeScreen
  extends NativeStackScreenProps<any, 'Welcome', 'mystack'> {}

const WelcomeScreen = ({ navigation }: IWelcomeScreen) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return <MySafeArea style={styles.wrapper}></MySafeArea>;
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  wrapper: {},
});
