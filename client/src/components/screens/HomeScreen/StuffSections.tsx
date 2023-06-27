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
  extends NativeStackScreenProps<any, 'Home', 'mystack'> {}

const StuffSections = ({ navigation, route }: IStuffSections) => {
  const oldStuffs = useAppSelector((state) => state.items.oldStuffs);
  return (
    <View style={styles.wrapper}>
      {/* <FlatList
        data={[...categories.values()]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View key={item} style={styles.category__section}>
            <Text style={{ marginBottom: 12 }}>{item}</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {oldStuffs
                .filter((stuff) => stuff.category === item)
                .map((stuff) => (
                  <ItemCard
                    key={stuff.id}
                    item={stuff}
                    navigation={navigation}
                    route={route}
                  />
                ))}
            </ScrollView>
          </View>
        )}
      /> */}
      {[...categories.values()]?.map((category) => {
        const filteredList = oldStuffs.filter(
          (item) => item.category === category
        );
        if (filteredList.length <= 0) return null;

        return (
          <View key={category} style={styles.category__section}>
            <Text
              variant='displayMedium'
              style={{ marginBottom: 0, fontSize: 22, color: '#737373' }}
            >
              {category}
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
