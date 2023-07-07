import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useEffect } from 'react';
import OrderCard from './OrderCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHook';
import { useIsFocused } from '@react-navigation/native';
import { fetchOrderList } from '../../../redux/thunks/orders.thunk';
import { IOrderDto } from '../../../interfaces/dtos/order.dto';
import { ActivityIndicator } from 'react-native-paper';

interface IOrderList extends NativeStackScreenProps<any, 'Order', 'my-stack'> {
  showBottomSheet: any;
}

const OrderList: React.FC<IOrderList> = ({
  showBottomSheet,
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const orders = useAppSelector((state) => state.orders.orders);
  const ordersLoading = useAppSelector((state) => state.orders.isLoading);
  useEffect(() => {
    const fetchOrders = () => {
      dispatch(fetchOrderList());
    };
    if (isFocused) fetchOrders();
  }, [isFocused]);
  return (
    <View>
      {ordersLoading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <ScrollView>
          {orders?.map((order: IOrderDto) => (
            <OrderCard
              key={order.id}
              navigation={navigation}
              route={route}
              showBottomSheet={showBottomSheet}
              data={order}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
