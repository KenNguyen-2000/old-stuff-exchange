import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import data from './old_stuffs.json';
import CategoryCard from './CategoryCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CategoryCardLoading from './CategoryCardLoading';
import { ICategory } from '../../../interfaces/dtos';

const dummyArr = new Array(8).fill('');

interface ICategoryList extends NativeStackScreenProps<any, 'Home', 'mystack'> {
  categories: ICategory[];
}

const CategoryList = ({ navigation, categories }: ICategoryList) => {
  const handleNavigateItemList = (item: any) => {
    navigation.navigate('ItemList', {
      category: item,
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll__container}
        >
          {categories.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={{
                alignSelf: 'flex-start',
                justifyContent: 'space-evenly',
              }}
              numColumns={Math.ceil(categories.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({ item }) => {
                return (
                  <Pressable onPress={handleNavigateItemList.bind(null, item)}>
                    <CategoryCard key={item.id} category={item} />
                  </Pressable>
                );
              }}
              ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
            />
          ) : (
            <View style={{ display: 'flex', gap: 8 }}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                {dummyArr.map((item, index) => (
                  <CategoryCardLoading key={index} />
                ))}
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                {dummyArr.map((item, index) => (
                  <CategoryCardLoading key={index} />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#eaeaea',
    marginTop: -28,
    paddingBottom: 10,
  },
  container: {
    marginTop: 48,
    paddingHorizontal: 12,
  },
  scroll__container: {
    width: '100%',
  },
});
