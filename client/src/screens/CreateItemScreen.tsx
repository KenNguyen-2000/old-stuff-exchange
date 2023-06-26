import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MySafeArea from '../components/MySafeArea';
import { Text, TextInput } from 'react-native-paper';
import MyTextInput from '../components/MyTextInput';

interface ICreateItemScreen
  extends NativeStackScreenProps<any, 'CreateItem', 'mystack'> {}

const CreateItemScreen = ({ navigation }: ICreateItemScreen) => {
  return (
    <MySafeArea>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <Text variant='displayMedium' style={styles.title}>
            Add item
          </Text>
          <MyTextInput title='Name' />
          <MyTextInput
            title='Description'
            multiline
            style={{ height: 100, backgroundColor: 'rgba(231,224,236,1)' }}
          />
          <MyTextInput title='Price' />
        </View>
      </TouchableWithoutFeedback>
    </MySafeArea>
  );
};

export default CreateItemScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    padding: 12,
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
});
