import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, MD3Colors, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IOrderDto } from '../../../interfaces/dtos/order.dto';
import { OrderStatus } from '../../../interfaces/enums/order.enum';
import formatDate from '../../../helpers/dateFormatter';

interface IOrderCard extends NativeStackScreenProps<any, 'Order', 'my-stack'> {
  showBottomSheet: any;
  data: IOrderDto;
}

const statusColor = new Map([
  [OrderStatus.Accepted, '#20b13f'],
  [OrderStatus.Cancelled, MD3Colors.error60],
  [OrderStatus.Finished, MD3Colors.primary50],
  [OrderStatus.In_Progress, MD3Colors.neutralVariant50],
]);

const OrderCard: React.FC<IOrderCard> = ({
  showBottomSheet,
  navigation,
  data,
}) => {
  const { item, createdDate, status } = data;

  const handleRateOrder = () => {
    showBottomSheet();
  };

  const handleGoDetail = () => {
    navigation.navigate('OrderDetail', {
      order: data,
    });
  };

  return (
    <Pressable onPress={handleGoDetail} style={styles.wrapper}>
      <View style={styles.right__image}>
        <Image
          source={{
            uri:
              item.images.length > 0
                ? item.images[0].imageUri
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.content__wrapper}>
        <View style={styles.title__wrapper}>
          <Text style={styles.text__name}>Exchange for {item.name}</Text>
          <Text style={styles.text__date}>
            {formatDate(new Date(createdDate))}
          </Text>
          <View style={styles.action__wrapper}>
            <Pressable onPress={handleRateOrder}>
              <Text>Rate</Text>
            </Pressable>
            <Pressable onPress={handleRateOrder}>
              <Text style={{ color: statusColor.get(status) }}>{status}</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.price__wrapper}>
          <Text>{item.price === 0 ? 'Free' : item.price} Points</Text>
          <Text style={styles.price__bonus}>+2 points</Text>
        </View>
      </View>
    </Pressable>
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
    width: 50,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 999999,
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 1,
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
    alignItems: 'flex-end',
    gap: 6,
  },
  price__bonus: {
    fontSize: 12,
    color: '#a6a5a5',
  },
});
