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

const categories = new Map();
data.forEach((item) => {
  categories.set(item.category, item.category);
});

interface ICategoryList extends NativeStackScreenProps<any, 'Home', 'mystack'> {
  categories: any[];
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
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{
              alignSelf: 'flex-start',
              justifyContent: 'space-evenly',
            }}
            numColumns={Math.ceil([...categories.values()].length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item, index }) => {
              return (
                <Pressable onPress={handleNavigateItemList.bind(null, item)}>
                  <CategoryCard key={item} category={item} />
                </Pressable>
              );
            }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
          />
          {/* {[...categories.values()]
            .slice(0, [...categories.values()].length / 2)
            .map((category, index) => (
              <CategoryCard key={category} category={category} />
            ))}
          {[...categories.values()]
            .slice(
              [...categories.values()].length / 2,
              [...categories.values()].length - 1
            )
            .map((category, index) => (
              <CategoryCard key={category} category={category} />
            ))} */}
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
