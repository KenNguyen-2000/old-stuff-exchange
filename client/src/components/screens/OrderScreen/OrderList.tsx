import { StyleSheet, ScrollView, View } from 'react-native';
import React from 'react';
import OrderCard from './OrderCard';

const OrderList = ({ showBottomSheet }: any) => {
  return (
    <View>
      <ScrollView>
        <OrderCard showBottomSheet={showBottomSheet} />
      </ScrollView>
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
