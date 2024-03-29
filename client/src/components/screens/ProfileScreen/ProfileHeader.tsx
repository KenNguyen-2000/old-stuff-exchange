import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme, Avatar, Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppSelector } from '../../../redux/reduxHook';

interface IProfileHeader
  extends NativeStackScreenProps<any, 'Profile', 'mystack'> {}

const ProfileHeader = ({ navigation }: IProfileHeader) => {
  const userInfo = useAppSelector((state) => state.user.user);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
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
      <Avatar.Icon size={42} icon='account' />
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
            {new Date(userInfo.dob).toUTCString()}
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
