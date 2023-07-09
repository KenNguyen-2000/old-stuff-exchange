import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Platform,
  ScrollView,
  TextInput as OldTextInput,
} from 'react-native';
import React, { useState, useLayoutEffect, useRef } from 'react';
import { Button, TextInput, IconButton } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IRegisterDto } from '../interfaces/dtos';
import { registerRequest } from '../services/auth.service';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

interface IRegisterScreen
  extends NativeStackScreenProps<any, 'Register', 'mystack'> {}

const RegisterScreen = ({ navigation }: IRegisterScreen) => {
  const today = new Date();
  const bgPath =
    today.getHours() > 6 && today.getHours() < 19
      ? require('../../assets/images/login_bg_day.png')
      : require('../../assets/images/login_bg_night.png');
  const greetingText =
    today.getHours() > 6 && today.getHours() < 19 ? 'Morning' : 'Evening';

  const dobInputRef = useRef<OldTextInput>(null);

  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);
  const [credentials, setCredentials] = useState<IRegisterDto>({
    fullName: '',
    username: '',
    password: '',
    dob: new Date(),
    address: '',
    gender: false,
  });

  const handleSignUp = async () => {
    try {
      const res = await registerRequest(credentials);
      console.log(res);
      if (res.status === 200) navigation.navigate('Login');
    } catch (error: any) {
      console.log(error.data);
    }
  };

  const onChangeCredentials = (key: string, value: any) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate;
    onChangeCredentials('dob', currentDate);
    if (Platform.OS === 'android') setShow(false);
  };

  const showMode = (currentMode: any) => {
    if (Platform.OS === 'android') {
      setShow(false);
      DateTimePickerAndroid.open({
        value: credentials.dob,
        onChange,
        mode: currentMode,
        is24Hour: true,
        maximumDate: new Date(),
        minimumDate: new Date(1950, 0, 1),
      });
    } else {
      setShow(!show);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleNavigateLogin = () => navigation.navigate('Login');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={bgPath} style={styles.background__image} />
      <ScrollView
        style={styles.scroll_wrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View>
          <View style={styles.title__wrapper}>
            <Text style={styles.title}>Good</Text>
            <Text style={styles.title}> {greetingText}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <TextInput
            value={credentials.fullName}
            onChangeText={(text) => onChangeCredentials('fullName', text)}
            placeholder='Fullname'
            style={styles.text__input}
            textColor='#fff'
            underlineColor='#e1e1e1'
            activeUnderlineColor='#fff'
            placeholderTextColor='#e1e1e1'
          />
          <TextInput
            value={credentials.username}
            onChangeText={(text) => onChangeCredentials('username', text)}
            placeholder='Username'
            style={styles.text__input}
            textColor='#fff'
            underlineColor='#e1e1e1'
            activeUnderlineColor='#fff'
            placeholderTextColor='#e1e1e1'
          />
          <TextInput
            value={credentials.password}
            onChangeText={(text) => onChangeCredentials('password', text)}
            placeholder='Password'
            secureTextEntry={true}
            style={styles.text__input}
            textColor='#fff'
            underlineColor='#e1e1e1'
            activeUnderlineColor='#fff'
            placeholderTextColor='#e1e1e1'
          />
          <TextInput
            value={credentials.email}
            onChangeText={(text) => onChangeCredentials('email', text)}
            placeholder='Email'
            style={styles.text__input}
            textColor='#fff'
            underlineColor='#e1e1e1'
            activeUnderlineColor='#fff'
            placeholderTextColor='#e1e1e1'
          />
          <TextInput
            value={credentials.phoneNumber}
            onChangeText={(text) => onChangeCredentials('phoneNumber', text)}
            placeholder='Phone Number'
            style={styles.text__input}
            textColor='#fff'
            underlineColor='#e1e1e1'
            activeUnderlineColor='#fff'
            placeholderTextColor='#e1e1e1'
          />
          <Pressable
            onPress={showDatepicker}
            style={styles.date__text__pressable}
          >
            <Text style={styles.date__text}>
              {credentials.dob.toDateString()}
            </Text>
          </Pressable>
          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={credentials.dob}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onChange}
              style={{
                marginTop: -30,
                zIndex: 30,
              }}
              maximumDate={new Date(2022, 0, 1)}
              minimumDate={new Date(1950, 0, 1)}
            />
          )}
          <TextInput
            value={credentials.address}
            onChangeText={(text) => onChangeCredentials('address', text)}
            placeholder='Address'
            style={styles.text__input}
            textColor='#fff'
            underlineColor='#e1e1e1'
            activeUnderlineColor='#fff'
            placeholderTextColor='#e1e1e1'
          />
          <View style={styles.button__wrapper}>
            <Button
              mode='outlined'
              onPress={handleSignUp}
              style={styles.button}
              textColor='#e1e1e1'
            >
              Sign up
            </Button>
          </View>
          <View style={styles.end__wrapper}>
            <Pressable onPress={handleNavigateLogin}>
              <Text style={styles.forget__pwd__text}>
                {' '}
                Alread have an account?
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <IconButton
        icon={'keyboard-backspace'}
        iconColor='#fff'
        style={{ position: 'absolute', top: 20, left: 20 }}
        size={24}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
    position: 'relative',
    paddingTop: 80,
    paddingBottom: 100,
  },
  scroll_wrapper: {
    flex: 1,
    width: '100%',
    padding: 0,
    paddingHorizontal: 40,
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
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Quicksand_Book',
    fontSize: 42,
    color: '#fff',
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 10,
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
    fontSize: 20,
    fontFamily: 'Ubuntu',
    width: '100%',
    backgroundColor: 'transparent',
  },
  date__text__pressable: {
    width: '100%',
    height: 56,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e1e1e1',
    paddingLeft: 16,
    display: 'flex',
    justifyContent: 'center',
  },
  date__text: {
    color: '#e1e1e1',
    fontSize: 20,
  },
  date__picker: {
    width: '100%',
  },
  date__picker_2: {
    position: 'absolute',
    opacity: 1,
    textAlign: 'left',
  },
  button: {
    borderRadius: 6,
    borderColor: '#e1e1e1',
    paddingHorizontal: 10,
  },
  forget__pwd__text: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#e1e1e1',
  },
  end__wrapper: {
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
