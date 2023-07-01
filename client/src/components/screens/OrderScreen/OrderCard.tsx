import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Text } from 'react-native-paper';

const OrderCard = ({ showBottomSheet }: any) => {
  const handleRateOrder = () => {
    showBottomSheet();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.right__image}></View>
      <View style={styles.content__wrapper}>
        <View style={styles.title__wrapper}>
          <Text style={styles.text__name}>Trade for something</Text>
          <Text style={styles.text__date}>30 Jun 2023, 16:03</Text>
          <View style={styles.action__wrapper}>
            <Pressable onPress={handleRateOrder}>
              <Text>Rate</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.price__wrapper}>
          <Text>91 Points</Text>
          <Text style={styles.price__bonus}>+2 points</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
    width: '100%',
    minHeight: 80,
    maxHeight: 120,
  },
  right__image: {
    width: 40,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 999999,
  },
  content__wrapper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title__wrapper: {
    display: 'flex',
    gap: 6,
  },
  action__wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 18,
  },
  text__name: {
    fontSize: 16,
  },
  text__date: {
    fontSize: 12,
    color: '#a6a5a5',
  },
  price__wrapper: {
    display: 'flex',
    gap: 6,
  },
  price__bonus: {
    fontSize: 12,
    color: '#a6a5a5',
  },
});
