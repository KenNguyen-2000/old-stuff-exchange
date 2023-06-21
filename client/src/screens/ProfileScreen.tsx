import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, List, MD3Colors } from 'react-native-paper';
import {
  ProfileHeader,
  ProfileSection,
} from '../components/screens/ProfileScreen';

interface IProfileScreen
  extends NativeStackScreenProps<any, 'Profile', 'mystack'> {}

const ProfileScreen = ({ navigation }: IProfileScreen) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView
      style={styles.scroll__wrapper}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.wrapper}>
        <ProfileHeader navigation={navigation} />
        <ProfileSection />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  scroll__wrapper: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  wrapper: {
    display: 'flex',
    gap: 10,
  },
});
