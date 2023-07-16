import {
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, TextInput, IconButton, Text } from 'react-native-paper';
import { loginRequest } from '../services/auth.service';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { useAppDispatch } from '../redux/reduxHook';
import { fetchUserInfo } from '../redux/thunks/user.thunk';
import AlertDialog from '../components/AlertDialog';

interface ILoginScreen
  extends NativeStackScreenProps<any, 'Login', 'mystack'> {}

const LoginScreen = ({ navigation }: ILoginScreen) => {
  const dateTime = new Date();
  const bgPath =
    dateTime.getHours() > 6 && dateTime.getHours() < 19
      ? require('../../assets/images/login_bg_day.png')
      : require('../../assets/images/login_bg_night.png');
  const greetingText =
    dateTime.getHours() > 6 && dateTime.getHours() < 19 ? 'Morning' : 'Evening';

  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showDialog, setShowDialog] = useState({
    isShow: false,
    message: '',
  });

  const handleSignIn = async () => {
    try {
      if (username === '' || password === '') {
        handleShowDialog('Username and Password are required!');
      }
      const res = await loginRequest({ username, password });
      if (res.succeeded) {
        const decoded: any = jwtDecode(res.data);
        await SecureStore.setItemAsync('token', res.data);
        await dispatch(fetchUserInfo());
        navigation.navigate('Home');
      } else {
        handleShowDialog('Username or password incorrect!');
      }
    } catch (error: any) {
      console.log(error);
      handleShowDialog('Username or password incorrect!');
    }
  };

  const handleNavigateRegister = () => navigation.navigate('Register');

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <ImageBackground source={bgPath} style={styles.background__image} />
          <View>
            <View style={styles.title__wrapper}>
              <Text style={styles.title}>Good</Text>
              <Text style={styles.title}> {greetingText}</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <TextInput
              mode='flat'
              value={username}
              onChangeText={setUsername}
              placeholder='Username'
              style={styles.text__input}
              textColor='#fff'
              underlineColor='#e1e1e1'
              activeUnderlineColor='#fff'
              placeholderTextColor='#e1e1e1'
            />
            <TextInput
              mode='flat'
              value={password}
              onChangeText={setPassword}
              placeholder='Password'
              secureTextEntry={true}
              style={styles.text__input}
              textColor='#fff'
              underlineColor='#e1e1e1'
              activeUnderlineColor='#fff'
              placeholderTextColor='#e1e1e1'
            />
            <Button
              mode='outlined'
              onPress={handleSignIn}
              style={styles.button}
            >
              <Text style={{ color: '#fff', fontSize: 18 }}>Sign in</Text>
            </Button>
          </View>
          <View style={styles.end__wrapper}>
            <Text style={{ color: '#fff' }}>Don't have an accout?</Text>
            <Pressable onPress={handleNavigateRegister}>
              <Text style={styles.forget__pwd__text}> Sign up</Text>
            </Pressable>
          </View>
          <IconButton
            icon={'keyboard-backspace'}
            iconColor='#fff'
            style={{ position: 'absolute', top: 20, left: 20 }}
            size={24}
            onPress={() => navigation.navigate('Home')}
          />
          {showDialog.isShow && (
            <AlertDialog
              message={showDialog.message}
              onDismiss={() => setShowDialog({ isShow: false, message: '' })}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingTop: 120,
  },
  background__image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  title__wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Quicksand_Book',
    fontSize: 42,
    color: '#fff',
  },
  footer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 40,
  },
  button: {
    borderRadius: 6,
    borderColor: '#e1e1e1',
    width: '100%',
  },
  text__wrapper: {
    paddingBottom: 10,
  },
  text__input: {
    fontSize: 20,
    fontFamily: 'Ubuntu',
    width: '100%',
    backgroundColor: 'transparent',
  },
  forget__pwd__text: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#e1e1e1',
  },
  end__wrapper: {
    alignSelf: 'flex-end',
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.2)',
  },
});
