import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  IconButton,
  MD3Colors,
  Text,
  useTheme,
} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { useAppSelector } from '../redux/reduxHook';
import { Pressable } from 'react-native';

interface IItemDetailScreen
  extends NativeStackScreenProps<any, 'ItemDetail', 'mystack'> {}

const ItemDetailScreen = ({ navigation, route }: IItemDetailScreen) => {
  const { item }: any = route.params;
  const theme = useTheme();
  const oldStuffs = useAppSelector((state) => state.items.oldStuffs);

  const handleMakeExchange = () => {};

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
            uri: item.images[0].imageUri || item.imageUrl,
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
            onPress={handleMakeExchange}
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
                  aspectRatio: 3 / 4,
                  width: 160,
                  borderWidth: 1.5,
                  borderColor: '#eaeaea',
                  borderRadius: 16,
                }}
                onPress={() => navigation.push('ItemDetail', { item: item })}
              >
                <ImageBackground
                  source={{ uri: item.images[0].imageUri || item.imageUrl }}
                  style={{
                    aspectRatio: 3 / 4,
                    width: 160,
                    borderWidth: 1.5,
                    borderColor: '#eaeaea',
                    borderRadius: 16,
                  }}
                  resizeMode='cover'
                ></ImageBackground>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          />
        </View>

        <Button
          style={{ marginTop: 16, borderRadius: 8 }}
          mode='contained'
          onPress={handleMakeExchange}
        >
          Exchange
        </Button>
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
