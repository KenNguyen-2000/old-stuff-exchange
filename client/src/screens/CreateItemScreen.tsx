import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MySafeArea from '../components/MySafeArea';
import { Text, Button, IconButton } from 'react-native-paper';
import MyTextInput from '../components/MyTextInput';
import * as ImagePicker from 'expo-image-picker';

interface ICreateItemScreen
  extends NativeStackScreenProps<any, 'CreateItem', 'mystack'> {}

const CreateItemScreen = ({ navigation }: ICreateItemScreen) => {
  const [image, setImage] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    console.log('Create');
  };

  return (
    <MySafeArea>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
            <IconButton
              icon={'keyboard-backspace'}
              onPress={() => navigation.goBack()}
            />
            <Text variant='displayMedium' style={styles.title}>
              Add item
            </Text>
          </View>

          <View style={styles.upload__image__wrapper}>
            {image !== '' && (
              <Image
                source={{ uri: image }}
                style={{
                  // width: '100%',
                  height: '100%',
                  aspectRatio: 4 / 3,
                  resizeMode: 'contain',
                }}
              />
            )}
          </View>
          <Button onPress={pickImage}>Pick an image from camera roll</Button>
          <MyTextInput title='Name' />
          <MyTextInput
            title='Description'
            multiline
            style={{ height: 100, backgroundColor: 'rgba(231,224,236,1)' }}
          />
          <MyTextInput title='Price' />
        </View>
        <Button onPress={handleCreate}>Create Item</Button>
      </ScrollView>
    </MySafeArea>
  );
};

export default CreateItemScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    padding: 12,
    display: 'flex',
    gap: 12,
  },
  upload__image__wrapper: {
    width: '100%',
    height: 220,
    backgroundColor: '#333',
    borderRadius: 12,
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
});
