import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IMySafeArea extends ViewProps {}

const MySafeArea = (props: IMySafeArea) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop:
            Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight,
        },
        props.style,
      ]}
      {...props}
    >
      {props.children}
    </View>
  );
};

export default MySafeArea;

const styles = StyleSheet.create({});
