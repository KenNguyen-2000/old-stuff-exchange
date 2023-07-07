import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Dialog, MD3Colors, Portal, Text } from 'react-native-paper';
import MySafeArea from '../components/MySafeArea';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IOrderDto } from '../interfaces/dtos/order.dto';
import { OrderStatus } from '../interfaces/enums/order.enum';
import { useAppDispatch, useAppSelector } from '../redux/reduxHook';
import { fetchUserInfo } from '../redux/thunks/user.thunk';
import { changeOrderStatus } from '../services/order.service';
import { AlertDialog } from '../components';
import { setOrderStatus } from '../redux/slices/ordersSlice';

type RootStackParamrs = {
  OrderDetail: {
    order: IOrderDto;
  };
};
interface IOrderDetailScreen
  extends NativeStackScreenProps<RootStackParamrs, 'OrderDetail', 'mystack'> {}

const OrderDetailScreen = ({ navigation, route }: IOrderDetailScreen) => {
  const { order } = route.params;

  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.user);
  const [visible, setVisible] = useState(false);

  const handleChangeOrderStatus = async (newStatus: OrderStatus) => {
    try {
      const curStatus = order.status;
      dispatch(setOrderStatus({ id: order.id, status: newStatus }));
      const res = await changeOrderStatus({
        id: order.id,
        status: newStatus,
      });
      if (!res.suceeded)
        dispatch(setOrderStatus({ id: order.id, status: curStatus }));
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderAction = () => {
    if (!userInfo) return null;
    console.log('user', userInfo);

    if (userInfo.id === order.user.id && order.status === OrderStatus.Accepted)
      return (
        <Button
          mode='contained'
          style={styles.confirm__btn}
          onPress={handleChangeOrderStatus.bind(null, OrderStatus.Finished)}
        >
          Finish Order
        </Button>
      );
    else if (
      userInfo.id === order.item.user.id &&
      order.status === OrderStatus.In_Progress
    )
      return (
        <Button
          mode='contained'
          style={styles.confirm__btn}
          onPress={handleChangeOrderStatus.bind(null, OrderStatus.Accepted)}
        >
          Confirm Order
        </Button>
      );
    else return null;
  };

  useEffect(() => {
    if (!userInfo) dispatch(fetchUserInfo());
  }, []);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.wrapper}>
        <Text
          variant='headlineLarge'
          style={{
            marginBottom: 24,
          }}
        >
          Order #{2000 + order.id} details
        </Text>

        <View style={styles.body__wrapper}>
          <View style={styles.section}>
            <View style={styles.order__header}>
              <AntDesign
                name='checkcircle'
                size={36}
                color={
                  [
                    OrderStatus.In_Progress,
                    OrderStatus.Accepted,
                    OrderStatus.Finished,
                  ].includes(order.status)
                    ? '#000'
                    : 'gray'
                }
              />
              <Text variant='titleLarge'>Order Placed</Text>
            </View>
            <View style={styles.order__content}>
              <View
                style={{
                  width: 36,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <View
                  style={[
                    styles.progress__line,
                    {
                      backgroundColor: [OrderStatus.Finished].includes(
                        order.status
                      )
                        ? '#000'
                        : 'gray',
                    },
                  ]}
                ></View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.order__description}>
                  Your item have been reserved.{' '}
                  {new Date(order.createdDate).toUTCString()}
                </Text>
              </View>
            </View>
          </View>
          {/* ********************Processing*************************** */}
          <View style={styles.section}>
            <View style={styles.order__header}>
              <MaterialCommunityIcons
                name='clock'
                size={36}
                color={
                  [
                    OrderStatus.In_Progress,
                    OrderStatus.Accepted,
                    OrderStatus.Finished,
                  ].includes(order.status)
                    ? '#000'
                    : 'gray'
                }
              />
              <Text variant='titleLarge'>Processing</Text>
            </View>
            <View style={styles.order__content}>
              <View
                style={{
                  width: 36,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <View
                  style={[
                    styles.progress__line,
                    {
                      backgroundColor: [OrderStatus.Finished].includes(
                        order.status
                      )
                        ? '#000'
                        : 'gray',
                    },
                  ]}
                ></View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.order__description}>
                  Your item is being prepared for delivery. Estimate delivery
                  time: 2-3 business days.{' '}
                  {new Date(order.createdDate).toUTCString()}
                </Text>
              </View>
            </View>
          </View>
          {/* ********************Confirm*************************** */}
          <View style={styles.section}>
            <View style={styles.order__header}>
              <MaterialCommunityIcons
                name='truck-delivery'
                size={36}
                color={
                  [OrderStatus.Finished, OrderStatus.Accepted].includes(
                    order.status
                  )
                    ? '#000'
                    : 'gray'
                }
              />
              <Text variant='titleLarge'>Confirm</Text>
            </View>
            <View style={styles.order__content}>
              <View
                style={{
                  width: 36,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <View
                  style={[
                    styles.progress__line,
                    {
                      backgroundColor: [OrderStatus.Finished].includes(
                        order.status
                      )
                        ? '#000'
                        : 'gray',
                    },
                  ]}
                ></View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.order__description}>
                  Your item is on its way.
                </Text>
              </View>
            </View>
          </View>

          {/* ********************Delivered*************************** */}
          <View style={styles.section}>
            <View style={styles.order__header}>
              <AntDesign
                name='checkcircle'
                size={36}
                color={
                  [OrderStatus.Finished].includes(order.status)
                    ? '#000'
                    : 'gray'
                }
              />
              <Text variant='titleLarge'>Delivered</Text>
            </View>
            <View style={styles.order__content}>
              <View
                style={{
                  width: 36,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <View
                  style={[
                    styles.progress__line,
                    {
                      backgroundColor: [OrderStatus.Finished].includes(
                        order.status
                      )
                        ? '#000'
                        : 'gray',
                    },
                  ]}
                ></View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.order__description}>
                  Your item has been delivered successfully. Leave a review for
                  the item owner in the 'Orders'
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 24 }}
          >
            {getOrderAction()}
            <Button
              mode='contained'
              style={styles.confirm__btn}
              buttonColor={MD3Colors.error60}
              onPress={() => setVisible(true)}
            >
              Cancel Order
            </Button>
          </View>
        </View>
        <View style={{ height: 24 }}></View>
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Cancel Order</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium'>
              Are sure about refusing this order?
            </Text>
            <Text>This action cannot be reversed</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={handleChangeOrderStatus.bind(
                null,
                OrderStatus.Cancelled
              )}
              textColor={MD3Colors.error40}
            >
              Confirm
            </Button>
            <Button onPress={() => setVisible(false)}>Dismiss</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 20,
    backgroundColor: '#fff',
    paddingVertical: 24,
    // marginBottom: 24,
  },
  body__wrapper: {
    // paddingHorizontal: 16,
    display: 'flex',
    gap: 6,
  },
  section: {
    display: 'flex',
    gap: 4,
  },

  order__header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  order__content: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  progress__line: {
    width: 1,
    minHeight: 60,
    flex: 1,
  },
  order__description: {
    color: 'gray',
    width: '90%',
  },
  confirm__btn: { paddingVertical: 4 },
  back__btn: { paddingVertical: 4 },
});
