import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import Constants from 'expo-constants';

interface ICategoryCard {
  category: any;
}

const CategoryCard = ({ category }: ICategoryCard) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.image__wrapper}>
        <Image
          source={{
            uri: `${Constants.expoConfig?.extra?.apiUrl}/assets/${
              category.imageUri.split('/')[2]
            }`,
          }}
          style={{
            width: '100%',
            aspectRatio: 1 / 1,
            resizeMode: 'cover',
          }}
        />
      </View>
      <Text style={{ textAlign: 'center', fontSize: 12 }}>{category.name}</Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  wrapper: {
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    padding: 5,
    // height: 160,
  },
  image__wrapper: {
    width: 40,
    borderWidth: 1,
    borderColor: '#6e6d6d',
    marginRight: 8,
    borderRadius: 8,
    aspectRatio: 1 / 1,
    padding: 3,
    backgroundColor: '#fff',
  },
});
