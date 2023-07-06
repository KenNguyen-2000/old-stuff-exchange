import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  IconButton,
  MD3Colors,
  Text,
  useTheme,
} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../redux/reduxHook';
import { Pressable } from 'react-native';
import useUserInfo from '../hooks/useUserInfo';
import { deleteItem } from '../services/item.service';
import { deleteOldStuff } from '../redux/slices/itemListSlice';
import { makeAnOrder } from '../services/order.service';
import { IItemDto, IUserInfo } from '../interfaces/dtos';

type RootStackParamList = {
  ItemDetail: {
    item: IItemDto;
  };
};

interface IItemDetailScreen
  extends NativeStackScreenProps<RootStackParamList, 'ItemDetail', 'mystack'> {}

const ItemDetailScreen = ({ navigation, route }: IItemDetailScreen) => {
  const { item } = route.params;
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const oldStuffs = useAppSelector((state) => state.items.oldStuffs);
  const userInfo: IUserInfo | null = useUserInfo();

  const handleMakeExchange = async (itemId: string) => {
    try {
      const res = await makeAnOrder(itemId);
      if (res.succeeded) console.log(res);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const res = await deleteItem(itemId);
      if (res.succeeded) {
        dispatch(deleteOldStuff(itemId));
        navigation.pop();
      } else console.log(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.wrapper}>
      <Pressable style={styles.header__wrapper}>
        <ImageBackground
          source={{
            uri: item.images[0].imageUri,
          }}
          resizeMode='cover'
          style={styles.header__wrapper}
        >
          <IconButton
            icon={'keyboard-backspace'}
            mode='outlined'
            style={styles.back__icon}
            containerColor={MD3Colors.error60}
            iconColor={MD3Colors.error100}
            size={24}
            onPress={() => navigation.pop()}
          />
          <IconButton
            icon={'shopping'}
            mode='contained'
            iconColor='#fff'
            containerColor={MD3Colors.primary40}
            size={28}
            style={styles.shopping__icon}
            onPress={handleMakeExchange.bind(null, item.id)}
          />
        </ImageBackground>
      </Pressable>
      <View style={styles.body__wrapper}>
        <Text style={styles.item__title} variant='headlineMedium'>
          {item.name}
        </Text>
        <Text variant='titleMedium' style={{ marginBottom: 12 }}>
          {item.price} Points
        </Text>
        <Text style={styles.item__description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset{' '}
        </Text>

        <View>
          <Text variant='headlineSmall'>Others</Text>
          <FlatList
            data={oldStuffs.filter((stuff) => stuff.id !== item.id)}
            horizontal={true}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  width: 160,
                  borderWidth: 2,
                  borderColor: '#cccccc',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
                onPress={() => navigation.push('ItemDetail', { item: item })}
              >
                <ImageBackground
                  source={{ uri: item.images[0].imageUri || item.imageUrl }}
                  style={{
                    aspectRatio: 3 / 4,
                    width: '100%',
                    borderRadius: 16,
                  }}
                  resizeMode='cover'
                ></ImageBackground>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          />
        </View>
        {userInfo &&
          (userInfo.id !== item.user.id ? (
            <Button
              style={{ marginTop: 16, borderRadius: 8 }}
              mode='contained'
              onPress={handleMakeExchange.bind(null, item.id)}
            >
              Exchange
            </Button>
          ) : (
            <>
              <Button
                style={{ marginTop: 16, borderRadius: 8 }}
                mode='contained'
                onPress={handleMakeExchange.bind(null, item.id)}
                buttonColor={theme.colors.tertiary}
              >
                Edit
              </Button>
              <Button
                style={{ marginTop: 8, borderRadius: 8 }}
                mode='contained'
                onPress={handleDeleteItem.bind(null, item.id)}
                buttonColor={theme.colors.error}
              >
                Delete
              </Button>
            </>
          ))}
      </View>
    </ScrollView>
  );
};

export default ItemDetailScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header__wrapper: {
    width: '100%',
    aspectRatio: 3 / 4,
    position: 'relative',
    zIndex: 2,
    borderBottomWidth: 1.2,
    borderBottomColor: '#d0d0d0',
  },
  back__icon: {
    position: 'absolute',
    top: 32,
    left: 12,
    borderColor: MD3Colors.error60,
  },
  shopping__icon: {
    position: 'absolute',
    bottom: -24,
    right: 12,
    zIndex: 24,
  },
  body__wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  item__title: {
    marginBottom: 12,
  },
  item__description: {
    marginBottom: 24,
  },
});
