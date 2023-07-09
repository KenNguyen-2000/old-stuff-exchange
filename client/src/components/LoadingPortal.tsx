import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityIndicator, Portal } from 'react-native-paper';

const LoadingPortal = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator animating={true} size={'large'} />
    </View>
  );
};

export default LoadingPortal;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
