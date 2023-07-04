import { StyleSheet, ScrollView, View } from 'react-native';
import React from 'react';
import OrderCard from './OrderCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface IOrderList extends NativeStackScreenProps<any, 'Order', 'my-stack'> {
  showBottomSheet: any;
}

const OrderList: React.FC<IOrderList> = ({
  showBottomSheet,
  navigation,
  route,
}) => {
  return (
    <View>
      <ScrollView>
        <OrderCard
          navigation={navigation}
          route={route}
          showBottomSheet={showBottomSheet}
        />
      </ScrollView>
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
