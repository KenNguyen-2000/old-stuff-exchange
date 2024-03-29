import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  StuffSections,
  HomeHeader,
  CategoryList,
  HomeBanner,
} from '../components/screens/HomeScreen';
import { TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '../redux/reduxHook';
import { filterOldStuffs } from '../redux/slices/itemListSlice';
import { getListItemCategory } from '../services/item.service';
import { fetchItemList } from '../redux/thunks/itemList.thunk';
import { fetchUserInfo } from '../redux/thunks/user.thunk';
import { ICategory } from '../interfaces/dtos';
import { RefreshControl } from 'react-native-gesture-handler';

interface IHomeScreen extends NativeStackScreenProps<any, 'Home', 'mystack'> {}

const HomeScreen = ({ navigation, route }: IHomeScreen) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onSearchChange = (text: string) => {
    dispatch(filterOldStuffs(text));
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setLoading(true);
      await dispatch(fetchItemList());
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getListItemCategory();
        setCategories(data.datas);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    const fetchItems = async () => {
      await dispatch(fetchItemList());
    };

    fetchCategories();
    fetchItems();
  }, [setLoading]);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
        refreshControl={
          <RefreshControl
            style={{
              backgroundColor: '#869ee2',
            }}
            progressBackgroundColor={'#869ee2'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
        <CategoryList
          navigation={navigation}
          route={route}
          categories={categories}
          isLoading={loading}
        />
        <HomeBanner />

        <StuffSections
          navigation={navigation}
          route={route}
          categories={categories}
        />
        <View style={{ flexGrow: 1, height: 100 }}></View>
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
