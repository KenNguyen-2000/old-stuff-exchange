import { StyleSheet, View, Image, Pressable } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

interface IItemListCard {
  item: any;
  index: number;
  navigation: any;
}

const ItemListCard: React.FC<IItemListCard> = ({ item, index, navigation }) => {
  const handleGoDetail = () => {
    navigation.navigate('ItemDetail', {
      item: item,
    });
  };

  return (
    <Pressable
      onPress={handleGoDetail}
      style={[styles.wrapper, index % 2 == 0 ? { marginRight: 5 } : {}]}
    >
      <View style={styles.image__wrapper}>
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
        <Text style={{ flexWrap: 'wrap' }}>{item.name}</Text>
        <Text>{item.price} Points</Text>
      </View>
      <View style={styles.footer}>
        <EvilIcons name='location' size={18} />
        <Text>HCm</Text>
      </View>
    </Pressable>
  );
};

export default ItemListCard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    maxWidth: '50%',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#fff',
  },
  image__wrapper: {
    width: '100%',
    aspectRatio: 6 / 7,
    backgroundColor: '#eaeaea',
  },
  image: {
    width: '100%',
    aspectRatio: 6 / 7,
    resizeMode: 'cover',
  },
  content__wrapper: {
    flexGrow: 1,
    minHeight: 60,
    paddingHorizontal: 4,
    paddingTop: 12,
    paddingBottom: 8,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 4,
  },
  footer: {
    paddingHorizontal: 4,
    marginTop: 4,
    paddingBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});
