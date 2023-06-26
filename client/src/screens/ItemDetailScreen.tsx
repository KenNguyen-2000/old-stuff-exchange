import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface IItemDetailScreen
  extends NativeStackScreenProps<any, 'ItemDetail', 'mystack'> {}

const ItemDetailScreen = ({ navigation, route }: IItemDetailScreen) => {
  const { item }: any = route.params;
  return (
    <View>
      <Text>ItemDetailScreen</Text>
      <Text>{item.name}</Text>
    </View>
  );
};

export default ItemDetailScreen;

const styles = StyleSheet.create({});
