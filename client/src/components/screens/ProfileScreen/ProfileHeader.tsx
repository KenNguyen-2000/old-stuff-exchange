import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme, Avatar, Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppSelector } from '../../../redux/reduxHook';
import * as ImagePicker from 'expo-image-picker';
import { updateAvatar, updateUserInfo } from '../../../services/user.service';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../../../firebaseConfig';
import formatDate from '../../../helpers/dateFormatter';

interface IProfileHeader
  extends NativeStackScreenProps<any, 'Profile', 'mystack'> {}

const ProfileHeader = ({ navigation }: IProfileHeader) => {
  const userInfo = useAppSelector((state) => state.user.user);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState(
    userInfo?.imageUri ? userInfo.imageUri : ''
  );

  const [camStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [libStatus, requestLibPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const pickImage = async () => {
    try {
      if (!libStatus?.granted) {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          if (userInfo) {
            const downloaduri = await uploadImageAsync(result.assets[0].uri);
            const data = await updateAvatar({
              imageUri: downloaduri,
            });
            setImage(downloaduri);
            console.log(data);
          }
        }

        console.log(userInfo);
      } else {
        await requestLibPermission();
      }
    } catch (error) {
      console.log(error);
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

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.colors.primaryContainer,
          paddingTop: insets.top + 20,
        },
      ]}
    >
      <Pressable
        onPress={pickImage}
        style={{
          width: 42,
          aspectRatio: 1 / 1,
          backgroundColor: '#333',
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        {image === '' ? (
          <Avatar.Icon size={42} icon='account' />
        ) : (
          <Image
            source={{
              uri: image,
            }}
            style={{ width: '100%', aspectRatio: 1 / 1, resizeMode: 'cover' }}
          />
        )}
      </Pressable>
      {!userInfo ? (
        <View style={styles.button__wrapper}>
          <Button
            mode='outlined'
            style={[styles.button, { borderWidth: 0 }]}
            labelStyle={styles.button__text}
            onPress={() => navigation.navigate('Login')}
            buttonColor={theme.colors.primary}
            textColor='#fff'
          >
            Sign In
          </Button>
          <Button
            mode='outlined'
            style={[styles.button, { borderColor: theme.colors.primary }]}
            labelStyle={styles.button__text}
            onPress={() => navigation.navigate('Register')}
          >
            Sign Up
          </Button>
        </View>
      ) : (
        <View>
          <Text style={{ fontSize: 20 }}>{userInfo.fullName}</Text>
          <Text style={{ fontSize: 20 }}>
            Dob:{' '}
            {formatDate(new Date(userInfo.dob))
              .split(' ')
              .slice(0, 3)
              .join(' ')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    // justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  button__wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    borderRadius: 4,
  },
  button__text: {
    fontSize: 14,
  },
});
