import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { MD3Colors, Text } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IItemDto } from '../../../interfaces/dtos';

interface IItemCard extends NativeStackScreenProps<any, 'Home', 'mystack'> {
  item: IItemDto;
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
        <View style={styles.card__image}>
          {item.images.length > 0 ? (
            <Image
              style={styles.image}
              source={{ uri: `${item.images[0].imageUri}` }}
              alt='Item card'
            />
          ) : (
            <Image
              style={styles.image}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
              }}
              alt='Item card'
            />
          )}
        </View>

        <Text style={styles.item__name}>{item.name}</Text>
        <View style={styles.card__footer}>
          <FontAwesome5 name='coins' size={24} color={'#fab339'} />
          <Text adjustsFontSizeToFit style={{ fontSize: 16, color: '#000' }}>
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
    width: 240,
    minHeight: 80,
    backgroundColor: '#e9e9e996',
    borderRadius: 12,
    padding: 10,
  },
  card__image: {
    width: '100%',
    aspectRatio: 4 / 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  item__name: {
    marginBottom: 20,
    flex: 1,
    textAlign: 'left',
    fontSize: 18,
  },
  card__footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
