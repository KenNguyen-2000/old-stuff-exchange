import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MySafeArea from '../components/MySafeArea';

const OrderScreen = () => {
  return (
    <MySafeArea>
      <Text>OrderScreen</Text>
    </MySafeArea>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
