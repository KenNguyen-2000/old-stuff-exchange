import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MySafeArea from '../components/MySafeArea';
import { Text, Button, IconButton } from 'react-native-paper';
import MyTextInput from '../components/MyTextInput';
import * as ImagePicker from 'expo-image-picker';
import { createNewItem, getListItemCategory } from '../services/item.service';
import { ICreateItem } from '../interfaces/dtos';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MySelector from '../components/MySelector';

interface ICreateItemScreen
  extends NativeStackScreenProps<any, 'CreateItem', 'mystack'> {}

const CreateItemScreen = ({ navigation }: ICreateItemScreen) => {
  const [images, setImages] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<ICreateItem>({
    name: '',
    description: '',
    price: 0,
    location: '',
    categoryId: '',
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const uriList = result.assets.map((img) => img.uri);
      setImages(uriList);
      handleChangeForm(
        'images',
        result.assets.map((img) => img.uri)
      );
    }
  };

  const handleChangeForm = (key: any, value: any) => {
    setNewItem((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const data = await createNewItem(newItem);
        if (data.succeeded) {
          navigation.goBack();
        }
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getListItemCategory();
        if (data.succeeded) {
          setCategories(data.datas);
          handleChangeForm(
            'categoryId',
            data.datas.find((item: any) => item.name === 'Others').id
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

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

          <Pressable style={styles.upload__image__wrapper} onPress={pickImage}>
            {images.length > 0 ? (
              <Image
                source={{ uri: images[0] }}
                style={{
                  // width: '100%',
                  height: '100%',
                  aspectRatio: 4 / 3,
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <MaterialCommunityIcons
                name='image-plus'
                color={'gray'}
                size={120}
              />
            )}
          </Pressable>
          <MyTextInput
            title='Name'
            onChangeText={(text) => handleChangeForm('name', text)}
            placeholder='Guitar, bicycle,...'
          />
          <MyTextInput
            title='Description'
            multiline
            style={{ height: 100, backgroundColor: 'rgba(231,224,236,1)' }}
            onChangeText={(text) => handleChangeForm('description', text)}
            placeholder='It have been used for 5 years.
            It have a small scratch.
            '
          />
          {categories.length > 0 ? (
            <MySelector
              title='Type'
              onValueChange={(itemValue: any, index: number) =>
                handleChangeForm('categoryId', itemValue)
              }
              value={categories.find((item) => item.name === 'Others').name}
              editable={false}
              datas={categories || []}
            />
          ) : (
            <MyTextInput title='Type' placeholder='Item Type' />
          )}
          <MyTextInput
            title='Price'
            inputMode='numeric'
            onChangeText={(text) => handleChangeForm('price', text)}
            placeholder='10'
          />
          <MyTextInput
            title='Location'
            style={{ backgroundColor: 'rgba(231,224,236,1)' }}
            onChangeText={(text) => handleChangeForm('location', text)}
            placeholder='Da Nang city'
          />
        </View>
        <Button
          mode='contained'
          style={{ marginHorizontal: 12, marginTop: 12, paddingVertical: 4 }}
          onPress={handleCreate}
          loading={isLoading}
        >
          {isLoading ? '' : 'Create Item'}
        </Button>
        <View style={{ height: 20 }} />
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
    backgroundColor: '#eaeaea',
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
