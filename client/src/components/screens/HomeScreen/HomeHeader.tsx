import { StyleSheet, View } from 'react-native';
import React from 'react';
import { IconButton, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IHomeHeader extends NativeStackScreenProps<any, 'Home', 'mystack'> {}

const HomeHeader = ({ navigation }: IHomeHeader) => {
  const insets = useSafeAreaInsets();

  const handleCreateItem = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) navigation.navigate('CreateItem');
    else navigation.navigate('Login');
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: insets.top + 24,
        },
      ]}
    >
      <Text style={styles.title}>Old Item List</Text>
      <IconButton
        icon={'plus'}
        style={{ position: 'absolute', right: 20, top: 30 }}
        onPress={handleCreateItem}
      />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#869ee2',
    minHeight: 100,
    paddingHorizontal: 12,
    paddingBottom: 40,
    position: 'relative',
    // zIndex: 30,
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
});
