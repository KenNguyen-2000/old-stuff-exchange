import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
const noImage = require('../../../../assets/images/No-Image-Placeholder.png');

interface IItemCard extends NativeStackScreenProps<any, 'Home', 'mystack'> {
  item: any;
}

const ItemCard = ({ item, navigation }: IItemCard) => {
  const handleGoDetail = () => {
    navigation.navigate('ItemDetail', {
      item: item,
    });
  };

  return (
    <>
      <Pressable style={styles.wrapper} onPress={handleGoDetail}>
        <View style={{ width: '100%', aspectRatio: 4 / 3, overflow: 'hidden' }}>
          {item.images.length > 0 ? (
            <Image
              style={styles.card__img}
              source={{ uri: `${item.images[0].imageUri}` }}
              alt='Item card'
            />
          ) : (
            <Image
              style={styles.card__img}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
              }}
              alt='Item card'
            />
          )}
        </View>

        <Text style={styles.item__name} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.card__footer}>
          <MaterialIcons name='shopping-cart' size={24} />
          <Text adjustsFontSizeToFit style={{ fontSize: 16 }}>
            {item.price === 0 ? 'FREE' : item.price} points
          </Text>
        </View>
      </Pressable>
      <View style={{ width: 10 }}></View>
    </>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  wrapper: {
    minWidth: 100,
    minHeight: 80,
    maxWidth: 180,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 10,
  },
  card__img: {
    width: '100%',
    aspectRatio: 4 / 3,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 6,
  },
  item__name: {
    marginBottom: 20,
    flex: 1,
    textAlign: 'left',
  },
  card__footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
