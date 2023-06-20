import {StyleSheet, Text, View, ImageBackground, Pressable} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {ButtonOutlined, MyTextInput} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';
import {IRegisterDto} from '../interfaces/dtos';
import {registerRequest} from '../services/auth.service';

interface IRegisterScreen
  extends NativeStackScreenProps<any, 'login', 'mystack'> {}

const RegisterScreen = ({navigation}: IRegisterScreen) => {
  const today = new Date();
  const bgPath =
    today.getHours() > 6 && today.getHours() < 19
      ? require('../../assets/images/login_bg_day.png')
      : require('../../assets/images/login_bg_night.png');
  const greetingText =
    today.getHours() > 6 && today.getHours() < 19 ? 'Morning' : 'Evening';

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [credentials, setCredentials] = useState<IRegisterDto>({
    fullName: '',
    username: '',
    password: '',
    dob: new Date(),
    address: '',
  });

  const handleSignUp = async () => {
    // console.log(Config.SERVER_URL);
    console.log('Sign up');
    try {
      const res = await registerRequest(credentials);
      console.log(res);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const onChangeCredentials = (key: string, value: any) => {
    setCredentials(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNavigateLogin = () => navigation.navigate('login');

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
      <View style={styles.content}>
        <MyTextInput
          value={credentials.fullName}
          onChangeText={text => onChangeCredentials('fullName', text)}
          placeholder="Fullname"
          wrapperStyle={styles.text__wrapper}
          textStyle={styles.text__input}
        />
        <MyTextInput
          value={credentials.username}
          onChangeText={text => onChangeCredentials('username', text)}
          placeholder="Username"
          wrapperStyle={styles.text__wrapper}
          textStyle={styles.text__input}
        />
        <MyTextInput
          value={credentials.password}
          onChangeText={text => onChangeCredentials('password', text)}
          placeholder="Password"
          secureTextEntry={true}
          wrapperStyle={styles.text__wrapper}
          textStyle={styles.text__input}
        />
        <MyTextInput
          value={credentials.email}
          onChangeText={text => onChangeCredentials('email', text)}
          placeholder="Email"
          wrapperStyle={styles.text__wrapper}
          textStyle={styles.text__input}
        />
        <MyTextInput
          value={credentials.phoneNumber}
          onChangeText={text => onChangeCredentials('phoneNumber', text)}
          placeholder="Phone Number"
          wrapperStyle={styles.text__wrapper}
          textStyle={styles.text__input}
        />
        <Pressable
          style={styles.date__picker}
          onPress={() => setShowDatePicker(true)}>
          <MyTextInput
            value={credentials.dob.toDateString()}
            placeholder="Date of birth"
            editable={false}
            wrapperStyle={styles.text__wrapper}
            textStyle={styles.text__input}
          />
        </Pressable>

        <DatePicker
          modal
          date={credentials.dob}
          open={showDatePicker}
          onConfirm={date => {
            onChangeCredentials('dob', date);
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)}
        />
        <MyTextInput
          value={credentials.address}
          onChangeText={text => onChangeCredentials('address', text)}
          placeholder="Address"
          wrapperStyle={styles.text__wrapper}
          textStyle={styles.text__input}
        />
        <View style={styles.button__wrapper}>
          <ButtonOutlined title="Sign up" onPress={handleSignUp} />
        </View>
        <Pressable onPress={handleNavigateLogin}>
          <Text style={styles.forget__pwd__text}>Alread have an account?</Text>
        </Pressable>
      </View>
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
  date__picker: {
    width: '100%',
  },
  forget__pwd__text: {
    marginTop: 8,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#e1e1e1',
  },
});
