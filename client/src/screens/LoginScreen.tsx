import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ButtonOutlined, MyTextInput} from '../components';

interface ILoginScreen
  extends NativeStackScreenProps<any, 'login', 'mystack'> {}

const LoginScreen = ({navigation}: ILoginScreen) => {
  const today = new Date();
  const bgPath =
    today.getHours() > 6 && today.getHours() < 19
      ? require('../../assets/images/login_bg_day.png')
      : require('../../assets/images/login_bg_night.png');
  const greetingText =
    today.getHours() > 6 && today.getHours() < 19 ? 'Morning' : 'Evening';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Sign in');
  };

  const handleNavigateRegister = () => navigation.navigate('register');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={bgPath} style={styles.background__image} />
      <View>
        <View style={styles.title__wrapper}>
          <Text style={styles.title}>Good</Text>
          <Text style={styles.title}> {greetingText}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <MyTextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          wrapperStyle={styles.text__wrapper}
          textStyle={styles.text__input}
        />
        <MyTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          wrapperStyle={styles.text__wrapper}
          textStyle={styles.text__input}
        />
        <View style={styles.button__wrapper}>
          <ButtonOutlined title="Sign in" onPress={handleSignIn} />
          <ButtonOutlined title="Sign up" onPress={handleSignIn} />
        </View>
        <Pressable onPress={handleNavigateRegister}>
          <Text style={styles.forget__pwd__text}>Forget Password</Text>
        </Pressable>
      </View>
    </View>
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
    paddingHorizontal: 40,
    paddingTop: 120,
    paddingBottom: 60,
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
    paddingHorizontal: 30,
  },
  button__wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
    marginTop: 40,
  },
  text__wrapper: {
    paddingBottom: 10,
  },
  text__input: {
    fontSize: 24,
  },
  forget__pwd__text: {
    marginTop: 8,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#e1e1e1',
  },
});
