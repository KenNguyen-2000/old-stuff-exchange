import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Dialog, MD3Colors, Portal, Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IOrderDto } from '../interfaces/dtos/order.dto';
import { OrderStatus } from '../interfaces/enums/order.enum';
import { useAppDispatch, useAppSelector } from '../redux/reduxHook';
import { fetchUserInfo } from '../redux/thunks/user.thunk';
import { changeOrderStatus } from '../services/order.service';
import { setOrderStatus } from '../redux/slices/ordersSlice';
import signalRService from '../helpers/signalRConnection';
import AlertDialog from '../components/AlertDialog';

type RootStackParamrs = {
  OrderDetail: {
    order: IOrderDto;
  };
};
interface IOrderDetailScreen
  extends NativeStackScreenProps<RootStackParamrs, 'OrderDetail', 'mystack'> {}

const OrderDetailScreen = ({ navigation, route }: IOrderDetailScreen) => {
  const { order } = route.params;

  const [curOrder, setCurOrder] = useState(order);
  const [showDialog, setShowDialog] = useState({
    isShow: false,
    message: '',
  });

  const connection = signalRService.getConnection();

  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.user);
  const [visible, setVisible] = useState(false);

  const handleChangeOrderStatus = async (newStatus: OrderStatus) => {
    try {
      const curStatus = curOrder.status;
      dispatch(setOrderStatus({ id: curOrder.id, status: newStatus }));
      const res = await changeOrderStatus({
        id: curOrder.id,
        status: newStatus,
      });
      if (!res.succeeded)
        dispatch(setOrderStatus({ id: curOrder.id, status: curStatus }));

      setVisible(false);
    } catch (error: any) {
      console.log(error);
      handleShowDialog(error.data.message);
    }
  };

  const getOrderAction = () => {
    if (!userInfo) return null;
    console.log('user', userInfo);

    if (
      userInfo.id === curOrder.user.id &&
      curOrder.status === OrderStatus.Accepted
    )
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
      userInfo.id === curOrder.item.user.id &&
      curOrder.status === OrderStatus.In_Progress
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

  const IsActive = (type: string): boolean => {
    let arr: OrderStatus[] = [];
    switch (type) {
      case OrderStatus.In_Progress:
        arr = [
          OrderStatus.Accepted,
          OrderStatus.Finished,
          OrderStatus.In_Progress,
        ];
        break;
      case OrderStatus.Accepted:
        arr = [OrderStatus.Accepted, OrderStatus.Finished];
        break;
      case OrderStatus.Finished:
        arr = [OrderStatus.Finished];
        break;
    }
    return arr.includes(curOrder.status);
  };

  const handleShowDialog = (message: string) => {
    setShowDialog({
      isShow: true,
      message: message,
    });

    // After 2 seconds, hide the dialog
    setTimeout(() => {
      setShowDialog({
        isShow: false,
        message: '',
      });
    }, 2600);
  };

  useEffect(() => {
    signalRService.startConnection();

    connection.on('OrderStatusUpdate', (status) => {
      setCurOrder((prev) => ({
        ...prev,
        status: status,
      }));
      console.log('New Status ', status);
    });

    if (!userInfo) dispatch(fetchUserInfo());

    return () => {
      signalRService.stopConnection();
    };
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
          Order #{2000 + curOrder.id} details
        </Text>

        <View style={styles.body__wrapper}>
          <View style={styles.section}>
            <View style={styles.order__header}>
              <View
                style={[
                  styles.icon__wrapper,
                  !IsActive(OrderStatus.In_Progress)
                    ? { backgroundColor: 'transparent' }
                    : {},
                ]}
              >
                <AntDesign
                  name='checkcircle'
                  size={36}
                  color={IsActive(OrderStatus.In_Progress) ? '#fff' : 'gray'}
                />
              </View>
              <Text variant='titleLarge'>Order Placed</Text>
            </View>
            <View style={styles.order__content}>
              <View
                style={{
                  width: 60,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <View
                  style={[
                    styles.progress__line,
                    {
                      backgroundColor: IsActive(OrderStatus.In_Progress)
                        ? '#000'
                        : 'gray',
                    },
                  ]}
                ></View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.order__description}>
                  Your item have been reserved.{' '}
                  {new Date(curOrder.createdDate).toUTCString()}
                </Text>
              </View>
            </View>
          </View>
          {/* ********************Processing*************************** */}
          <View style={styles.section}>
            <View style={styles.order__header}>
              <View
                style={[
                  styles.icon__wrapper,
                  !IsActive(OrderStatus.In_Progress)
                    ? { backgroundColor: 'transparent' }
                    : {},
                ]}
              >
                <MaterialCommunityIcons
                  name='clock'
                  size={36}
                  color={IsActive(OrderStatus.In_Progress) ? '#fff' : 'gray'}
                />
              </View>
              <Text variant='titleLarge'>Processing</Text>
            </View>
            <View style={styles.order__content}>
              <View
                style={{
                  width: 60,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <View
                  style={[
                    styles.progress__line,
                    {
                      backgroundColor: IsActive(OrderStatus.In_Progress)
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
                  {new Date(curOrder.createdDate).toUTCString()}
                </Text>
              </View>
            </View>
          </View>
          {/* ********************Confirm*************************** */}
          <View style={styles.section}>
            <View style={styles.order__header}>
              <View
                style={[
                  styles.icon__wrapper,
                  !IsActive(OrderStatus.Accepted)
                    ? { backgroundColor: 'transparent' }
                    : {},
                ]}
              >
                <MaterialCommunityIcons
                  name='truck-delivery'
                  size={36}
                  color={IsActive(OrderStatus.Accepted) ? '#fff' : 'gray'}
                />
              </View>
              <Text variant='titleLarge'>Confirm</Text>
            </View>
            <View style={styles.order__content}>
              <View
                style={{
                  width: 60,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <View
                  style={[
                    styles.progress__line,
                    {
                      backgroundColor: IsActive(OrderStatus.Accepted)
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
              <View
                style={[
                  styles.icon__wrapper,
                  !IsActive(OrderStatus.Finished)
                    ? { backgroundColor: 'transparent' }
                    : {},
                ]}
              >
                <AntDesign
                  name='checkcircle'
                  size={36}
                  color={IsActive(OrderStatus.Finished) ? '#fff' : 'gray'}
                />
              </View>
              <Text variant='titleLarge'>Delivered</Text>
            </View>
            <View style={styles.order__content}>
              <View
                style={{
                  width: 60,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <View
                  style={[
                    styles.progress__line,
                    {
                      backgroundColor: IsActive(OrderStatus.Finished)
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
            {curOrder.status !== OrderStatus.Finished && (
              <Button
                mode='contained'
                style={styles.confirm__btn}
                buttonColor={MD3Colors.error60}
                onPress={() => setVisible(true)}
              >
                Cancel Order
              </Button>
            )}
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

      {showDialog.isShow && (
        <AlertDialog
          message={showDialog.message}
          onDismiss={() => setShowDialog({ isShow: false, message: '' })}
        />
      )}
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
  icon__wrapper: {
    borderRadius: 9999,
    backgroundColor: MD3Colors.primary50,
    padding: 12,
    width: 60,
    aspectRatio: 1 / 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
