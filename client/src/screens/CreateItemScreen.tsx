import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MySafeArea from '../components/MySafeArea';
import {
  Text,
  Button,
  IconButton,
  MD3Colors,
  Portal,
} from 'react-native-paper';
import MyTextInput from '../components/MyTextInput';
import * as ImagePicker from 'expo-image-picker';
import { createNewItem, getListItemCategory } from '../services/item.service';
import { ICreateItem } from '../interfaces/dtos';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MySelector from '../components/MySelector';
import Carousel from 'react-native-reanimated-carousel';
import AlertDialog from '../components/AlertDialog';
import axios from 'axios';
import { firebase, storage } from '../../firebaseConfig';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

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
  const [showPreview, setShowPreview] = useState(false);
  const [dialog, setDialog] = useState({
    isShow: false,
    message: '',
  });
  const [camStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [libStatus, requestLibPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const pickImage = async () => {
    if (!libStatus?.granted) {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    } else {
      await requestLibPermission();
    }
  };

  const handleChangeForm = (key: any, value: any) => {
    setNewItem((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const showCamera = async () => {
    if (camStatus?.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        allowsEditing: true,
      });

      if (!result.canceled) {
        const uriList = result.assets.map((img) => img.uri);
        setImages(uriList);
        handleChangeForm(
          'images',
          result.assets.map((img) => img.uri)
        );
      }
    } else {
      await requestCameraPermission();
    }
    // No permissions request is necessary for launching the image library
  };

  const handleCreate = async () => {
    setIsLoading(true);

    let downloadUrls: string[] = [];
    if (newItem.images) {
      const values = await Promise.all(
        newItem.images.map(async (item) => {
          return await uploadImageAsync(item);
        })
      );
      downloadUrls = values;
    }

    try {
      setTimeout(async () => {
        const data = await createNewItem({
          ...newItem,
          images: downloadUrls,
        });
        if (data.succeeded) {
          navigation.goBack();
        }
        setIsLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log(error);
      handleShowDialog(error.data.message);
    }
  };
  const uploadImageAsync = async (uri: string) => {
    const acceptedUri =
      Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const blobRes = await fetch(acceptedUri);
    const blob = await blobRes.blob();
    const storageRef = ref(storage, `images/${Date.now()}`);

    await uploadBytesResumable(storageRef, blob);
    const downLoadUrl = await getDownloadURL(storageRef);
    return downLoadUrl;
  };

  const handleShowDialog = (message: string) => {
    setDialog({
      isShow: true,
      message: message,
    });
    setTimeout(() => {
      setDialog({
        isShow: false,
        message: '',
      });
    }, 2600);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.wrapper}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 12,
              }}
            >
              <IconButton
                icon={'keyboard-backspace'}
                onPress={() => navigation.goBack()}
              />
              <Text variant='displayMedium' style={styles.title}>
                Add Item
              </Text>
            </View>

            <Pressable
              style={styles.upload__image__wrapper}
              onPress={
                images.length > 0 ? () => setShowPreview(true) : pickImage
              }
            >
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

              <IconButton
                icon='camera'
                iconColor={MD3Colors.primary30}
                style={{ position: 'absolute', right: 10, bottom: 10 }}
                size={32}
                onPress={showCamera}
                mode='contained'
              />
            </Pressable>
            <MyTextInput
              title='Name'
              onChangeText={(text) => handleChangeForm('name', text)}
              placeholder='Guitar, bicycle,...'
              isRequired={true}
            />
            <MyTextInput
              title='Description'
              multiline
              style={{ height: 100, backgroundColor: 'rgba(231,224,236,1)' }}
              onChangeText={(text) => handleChangeForm('description', text)}
              placeholder='It have been used for 5 years.
            It have a small scratch.
            '
              isRequired={true}
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
              isRequired={true}
            />
            <MyTextInput
              title='Location'
              style={{ backgroundColor: 'rgba(231,224,236,1)' }}
              onChangeText={(text) => handleChangeForm('location', text)}
              placeholder='Da Nang city'
              isRequired={true}
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
      </KeyboardAvoidingView>
      {showPreview && (
        <Portal>
          <View
            style={{
              flex: 1,
              position: 'relative',
              backgroundColor: 'rgba(0,0,0,.75)',
            }}
          >
            <>
              <Carousel
                loop
                width={Dimensions.get('window').width}
                autoPlay={images.length > 1 ? true : false}
                enabled={images.length > 1 ? true : false}
                autoPlayInterval={3000}
                data={images}
                scrollAnimationDuration={2000}
                mode='parallax'
                renderItem={({ item, index }) => (
                  <TouchableWithoutFeedback
                    onPress={() => setShowPreview(false)}
                    accessible={false}
                  >
                    <View style={styles.preview__wrapper}>
                      <Pressable
                        style={{
                          paddingHorizontal: 15,
                          paddingVertical: 20,
                          backgroundColor: '#fff',
                        }}
                      >
                        <Image
                          key={index}
                          source={{ uri: item }}
                          style={{
                            width: '100%',
                            aspectRatio: 4 / 3,
                            resizeMode: 'contain',
                          }}
                        />
                      </Pressable>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
              <TouchableWithoutFeedback
                onPress={() => setShowPreview(false)}
                accessible={false}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 90,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  <IconButton
                    icon={'image-edit'}
                    iconColor={MD3Colors.primary60}
                    size={40}
                    onPress={pickImage}
                    mode='contained'
                  />
                  <IconButton
                    icon={'camera'}
                    iconColor={MD3Colors.primary60}
                    size={40}
                    onPress={showCamera}
                    mode='contained'
                  />
                </View>
              </TouchableWithoutFeedback>
            </>
          </View>
        </Portal>
      )}
      {dialog.isShow && (
        <AlertDialog
          message={dialog.message}
          onDismiss={() => setDialog({ message: '', isShow: false })}
        />
      )}
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
    position: 'relative',
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
  preview__wrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    position: 'relative',
  },
});
