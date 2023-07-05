import { StyleSheet, ScrollView, FlatList, SectionList } from 'react-native';
import React from 'react';
import { View } from 'react-native';
import data from './old_stuffs.json';
import ItemCard from './ItemCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../../../redux/reduxHook';
import { Text } from 'react-native-paper';

const categories = new Map();

data.forEach((item) => {
  categories.set(item.category, item.category);
});

interface IStuffSections
  extends NativeStackScreenProps<any, 'Home', 'mystack'> {
  categories: any[];
}

const StuffSections = ({ navigation, route, categories }: IStuffSections) => {
  const oldStuffs = useAppSelector((state) => state.items.oldStuffs);
  return (
    <View style={styles.wrapper}>
      {categories?.map((category) => {
        const filteredList = oldStuffs.filter(
          (item) => item.category.id === category.id
        );
        if (filteredList.length <= 0) return null;

        return (
          <View key={category.id} style={styles.category__section}>
            <Text
              variant='displayMedium'
              style={{ marginBottom: 0, fontSize: 22, color: '#737373' }}
            >
              {category.name}
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {filteredList.map((item: any) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  navigation={navigation}
                  route={route}
                />
              ))}
            </ScrollView>
          </View>
        );
      })}
    </View>
  );
};

export default StuffSections;

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 12,
  },
  category__section: {
    marginBottom: 24,
  },
});
