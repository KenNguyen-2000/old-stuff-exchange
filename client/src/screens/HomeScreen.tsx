import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import {
  StuffSections,
  HomeHeader,
  CategoryList,
} from '../components/screens/HomeScreen';
import { TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '../redux/reduxHook';
import { filterOldStuffs } from '../redux/slices/itemListSlice';

interface IHomeScreen extends NativeStackScreenProps<any, 'Home', 'mystack'> {}

const HomeScreen = ({ navigation, route }: IHomeScreen) => {
  const dispatch = useAppDispatch();

  const [searchString, setSearchString] = useState('');

  const onSearchChange = (text: string) => {
    dispatch(filterOldStuffs(text));
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <HomeHeader navigation={navigation} route={route} />
        <View style={styles.search__box}>
          <TextInput
            placeholder='Search something'
            left={<TextInput.Icon icon={'text-search'} />}
            outlineColor='#fff'
            mode='outlined'
            style={{ marginTop: -8 }}
            onChangeText={onSearchChange}
          />
        </View>
        <CategoryList navigation={navigation} route={route} />
        <StuffSections navigation={navigation} route={route} />
        <View style={{ flexGrow: 1, height: 100 }}></View>
        <Text>HomeScreen</Text>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search__box: {
    marginTop: -20,
    backgroundColor: 'white',
    marginHorizontal: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 4,
    zIndex: 10,
  },
});
