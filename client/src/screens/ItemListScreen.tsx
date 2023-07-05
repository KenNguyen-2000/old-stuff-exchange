import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IconButton, Searchbar, TextInput, useTheme } from 'react-native-paper';
import MySafeArea from '../components/MySafeArea';
import { SearchHeader } from '../components';
import { FlatList } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../redux/reduxHook';
import { ItemListCard } from '../components/screens/ItemListScreen';
import { fetchItemList } from '../redux/thunks/itemList.thunk';

interface IHomeScreen
  extends NativeStackScreenProps<any, 'ItemList', 'mystack'> {}

const ItemListScreen: React.FC<IHomeScreen> = ({ navigation, route }) => {
  const { category }: any = route.params;
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchStyle, setSearchStyle] = useState({
    ...styles.search,
  });

  const oldStuffs = useAppSelector((state) => state.items.oldStuffs);
  const dispatch = useAppDispatch();

  const onSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  console.log('ItemScreen', searchQuery);

  useEffect(() => {
    const fetchItems = () => {
      dispatch(fetchItemList());
    };

    fetchItems();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <MySafeArea>
      <View style={styles.headerWrapper}>
        <IconButton
          icon={'keyboard-backspace'}
          onPress={() => navigation.goBack()}
          iconColor={theme.colors.primary}
        />
        <View style={styles.headerSearchWrapper}>
          <Searchbar
            placeholder='Search'
            value={searchQuery}
            onChangeText={onSearchChange}
            elevation={1}
            style={searchStyle}
            inputStyle={styles.search__input}
            onFocus={() =>
              setSearchStyle((prev) => ({
                ...prev,
                borderWidth: 2,
                borderColor: theme.colors.primary,
              }))
            }
            onBlur={() =>
              setSearchStyle((prev) => ({
                ...prev,
                borderWidth: 0,
              }))
            }
          />
        </View>
      </View>
      <View style={styles.bodyWrapper}>
        {oldStuffs && (
          <FlatList
            data={oldStuffs}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item, index }) => (
              <ItemListCard item={item} index={index} navigation={navigation} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        )}
      </View>
    </MySafeArea>
  );
};

export default ItemListScreen;

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 24,
    paddingVertical: 12,
  },
  headerSearchWrapper: {
    flexGrow: 1,
  },
  search: {
    borderRadius: 4,
    // paddingVertical: 7
    maxHeight: 48,
  },
  search__input: {
    minHeight: 40,
    maxHeight: 48,
    fontSize: 14,
  },
  bodyWrapper: {
    backgroundColor: '#eaeaea',
    flex: 1,
    paddingHorizontal: 5,
  },
});
