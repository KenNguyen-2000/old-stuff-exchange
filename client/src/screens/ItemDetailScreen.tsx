import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  Dialog,
  IconButton,
  MD3Colors,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../redux/reduxHook';
import { Pressable } from 'react-native';
import { deleteItem } from '../services/item.service';
import { deleteOldStuff } from '../redux/slices/itemListSlice';
import { makeAnOrder } from '../services/order.service';
import { IItemDto, IUserInfo } from '../interfaces/dtos';
import { fetchUserInfo } from '../redux/thunks/user.thunk';
import Carousel from 'react-native-reanimated-carousel';
import AlertDialog from '../components/AlertDialog';

type RootStackParamList = {
  ItemDetail: {
    item: IItemDto;
  };
  Login: any;
  EditItem: any;
  Home: any;
};

interface IItemDetailScreen
  extends NativeStackScreenProps<RootStackParamList, 'ItemDetail', 'mystack'> {}

const ItemDetailScreen = ({ navigation, route }: IItemDetailScreen) => {
  const { item } = route.params;
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const oldStuffs = useAppSelector((state) => state.items.oldStuffs);
  const userInfo: IUserInfo | null = useAppSelector((state) => state.user.user);
  const [visible, setVisible] = useState(false);
  const [showDialog, setShowDialog] = useState({
    isShow: false,
    message: '',
  });

  const handleShowDialog = (message: string) => {
    setShowDialog({
      isShow: true,
      message: message,
    });

    // After 2 seconds, hide the dialog
    setTimeout(() => {
      setShowDialog({
        isShow: false,
        message: '',
      });
    }, 2600);
  };

  const handleMakeExchange = async (itemId: number) => {
    try {
      const res = await makeAnOrder(itemId);
      if (res.succeeded) navigation.navigate('Home');
    } catch (error: any) {
      console.log(error.data);
      handleShowDialog(error.data.message);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      const res = await deleteItem(itemId);
      if (res.succeeded) {
        dispatch(deleteOldStuff(itemId));
        navigation.pop();
      } else console.log(res.message);
    } catch (error: any) {
      console.log(error);
      handleShowDialog(error.data.message);
    }
  };

  const AlertModal = () => {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Cancel Order</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium'>Are sure about delete this item?</Text>
            <Text>This action cannot be reversed</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor={MD3Colors.error40}
              onPress={handleDeleteItem.bind(null, item.id)}
            >
              Confirm
            </Button>
            <Button onPress={() => setVisible(false)}>Dismiss</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  useEffect(() => {
    const fetchUser = async () => await dispatch(fetchUserInfo());
    if (!userInfo) fetchUser();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <ScrollView style={styles.wrapper}>
        <Pressable style={styles.header__wrapper}>
          {item.images.length > 0 ? (
            <Carousel
              loop
              width={Dimensions.get('window').width}
              height={(Dimensions.get('window').width * 4) / 3}
              autoPlay={true}
              autoPlayInterval={3000}
              data={item.images}
              scrollAnimationDuration={2000}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    {
                      flex: 1,
                      justifyContent: 'center',
                    },
                  ]}
                  key={item.id}
                >
                  <Image
                    source={{
                      uri: item.imageUri,
                    }}
                    resizeMode='cover'
                    style={styles.header__image}
                  />
                </View>
              )}
            />
          ) : (
            <Image
              source={{
                uri:
                  item.images.length > 0
                    ? item.images[0].imageUri
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
              }}
              resizeMode='cover'
              style={{
                width: '100%',
                aspectRatio: 3 / 4,
              }}
            />
          )}
          <IconButton
            icon={'keyboard-backspace'}
            mode='outlined'
            style={styles.back__icon}
            containerColor={MD3Colors.error60}
            iconColor={MD3Colors.error100}
            size={24}
            onPress={() => navigation.pop()}
          />
          {userInfo && userInfo.id !== item.user.id && (
            <IconButton
              icon={'shopping'}
              mode='contained'
              iconColor='#fff'
              containerColor={MD3Colors.primary40}
              size={28}
              style={styles.shopping__icon}
              onPress={handleMakeExchange.bind(null, item.id)}
            />
          )}
        </Pressable>

        <View style={styles.body__wrapper}>
          <Text style={styles.item__title} variant='headlineMedium'>
            {item.name}
          </Text>
          <Text variant='titleMedium' style={{ marginBottom: 12 }}>
            {item.price} Points
          </Text>
          <Text style={styles.item__title} variant='headlineSmall'>
            About Item
          </Text>
          <Text style={styles.item__description}>{item.description}</Text>

          <View>
            <Text style={styles.item__title} variant='headlineSmall'>
              Others
            </Text>
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
                    source={{
                      uri:
                        item.images.length > 0
                          ? item.images[0].imageUri
                          : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
                    }}
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

          {(!userInfo || userInfo.id !== item.user.id) && (
            <Button
              style={{ marginTop: 16, borderRadius: 8 }}
              mode='contained'
              onPress={
                !userInfo
                  ? () => navigation.navigate('Login')
                  : handleMakeExchange.bind(null, item.id)
              }
            >
              Exchange
            </Button>
          )}

          {userInfo && userInfo.id === item.user.id && (
            <>
              <Button
                style={{ marginTop: 16, borderRadius: 8 }}
                mode='contained'
                onPress={() =>
                  navigation.navigate('EditItem', {
                    item: item,
                  })
                }
                buttonColor={theme.colors.tertiary}
              >
                Edit
              </Button>
              <Button
                style={{ marginTop: 8, borderRadius: 8 }}
                mode='contained'
                onPress={() => setVisible(true)}
                buttonColor={theme.colors.error}
              >
                Delete
              </Button>
            </>
          )}
        </View>
        {AlertModal()}
      </ScrollView>
      {showDialog.isShow && (
        <AlertDialog
          message={showDialog.message}
          onDismiss={() => setShowDialog({ isShow: false, message: '' })}
        />
      )}
    </>
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
  header__image: {
    width: '100%',
    aspectRatio: 3 / 4,
    position: 'relative',
    zIndex: 2,
    borderBottomWidth: 1.2,
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
