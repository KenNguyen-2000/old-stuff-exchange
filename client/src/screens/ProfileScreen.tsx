import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, List, MD3Colors, Button, useTheme } from 'react-native-paper';
import {
  ProfileHeader,
  ProfileSection,
} from '../components/screens/ProfileScreen';
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch, useAppSelector } from '../redux/reduxHook';
import { setUser } from '../redux/slices/userSlice';
import { useIsFocused } from '@react-navigation/native';
import { fetchUserInfo } from '../redux/thunks/user.thunk';

interface IProfileScreen
  extends NativeStackScreenProps<any, 'Profile', 'mystack'> {}

const ProfileScreen = ({ navigation, route }: IProfileScreen) => {
  const userInfo = useAppSelector((state) => state.user.user);
  const isFocused = useIsFocused();
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    dispatch(setUser(null));
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (userInfo === null) {
      dispatch(fetchUserInfo());
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.scroll__wrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <ProfileHeader navigation={navigation} route={route} />
          <ProfileSection />
          {userInfo !== null && (
            <Button
              mode='contained'
              style={{ marginHorizontal: 8, borderRadius: 4 }}
              onPress={handleLogout.bind(null)}
            >
              Log out
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  scroll__wrapper: {
    flex: 1,
  },
  container: {
    display: 'flex',
    gap: 10,
    paddingBottom: 40,
  },
});
