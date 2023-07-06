import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from 'react-native-paper';
import MySafeArea from '../components/MySafeArea';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IOrderDetailScreen
  extends NativeStackScreenProps<any, 'OrderDetail', 'mystack'> {}

const OrderDetailScreen = ({ navigation }: IOrderDetailScreen) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <MySafeArea>
      <ScrollView style={styles.wrapper}>
        <Text
          variant='headlineLarge'
          style={{
            marginBottom: 24,
          }}
        >
          Order #2244 details
        </Text>

        <View style={styles.body__wrapper}>
          <View style={styles.section}>
            <View style={styles.order__header}>
              <AntDesign name='checkcircle' size={36} />
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
                <View style={styles.progress__line}></View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.order__description}>
                  Your item have been reserved. 22 August 2022, 9:38 AM
                </Text>
              </View>
            </View>
          </View>
          {/* ********************Processing*************************** */}
          <View style={styles.section}>
            <View style={styles.order__header}>
              <MaterialCommunityIcons name='clock' size={36} />
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
                <View style={styles.progress__line}></View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.order__description}>
                  Your item is being prepared for delivery. Estimate delivery
                  time: 2-3 business days. 22 August 2022, 10:15 AM
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
                color={'gray'}
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
                <View style={styles.progress__line}></View>
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
              <AntDesign name='checkcircle' size={36} color={'gray'} />
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
                <View style={styles.progress__line}></View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.order__description}>
                  Your item has been delivered successfully. Leave a review for
                  the item owner in the 'Orders'
                </Text>
              </View>
            </View>
          </View>

          <Button
            mode='contained'
            style={styles.back__btn}
            onPress={() => navigation.goBack()}
          >
            Back to Home
          </Button>
        </View>
        <View style={{ height: 24 }}></View>
      </ScrollView>
    </MySafeArea>
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
    backgroundColor: 'gray',
  },
  order__description: {
    color: 'gray',
    width: '90%',
  },
  back__btn: { marginTop: 30, marginBottom: 24, paddingVertical: 4 },
});
