import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IMySafeArea extends ViewProps {}

const MySafeArea = ({ children, style }: IMySafeArea) => {
  const insets = useSafeAreaInsets();
  const currentPaddingTop =
    Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight;
  const { paddingTop, paddingVertical, ...otherStyles } = (style as any) || {};

  const updatedPaddingTop =
    paddingTop !== undefined
      ? currentPaddingTop + paddingTop
      : currentPaddingTop;
  const updatedStyle = {
    ...otherStyles,
    paddingTop: updatedPaddingTop,
    paddingVertical:
      paddingVertical !== undefined
        ? updatedPaddingTop + paddingVertical
        : undefined,
  };
  return <View style={[{ flex: 1 }, updatedStyle]}>{children}</View>;
};

export default MySafeArea;

const styles = StyleSheet.create({});
