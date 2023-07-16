import { StyleSheet, View, Platform, StatusBar, Image } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, IconButton, Text } from 'react-native-paper';

const ChatDetailHeader = ({ navigation, sender }: any) => {
  console.log('Header', sender);
  const insets = useSafeAreaInsets();
  const currentPaddingTop =
    Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight;

  return (
    <View style={[{ paddingTop: currentPaddingTop }, styles.header__wrapper]}>
      <IconButton
        icon='chevron-left'
        size={24}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content__wrapper}>
        <View style={styles.avatar__wrapper}>
          {!sender?.imageUri ? (
            <Avatar.Icon size={40} icon='account' />
          ) : (
            <Image
              source={{
                uri: sender.imageUri,
              }}
              style={{
                width: '100%',
                aspectRatio: 1 / 1,
                resizeMode: 'cover',
              }}
            />
          )}
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <Text variant='bodyMedium'>{sender.fullName}</Text>
          <Text>{sender.address}</Text>
        </View>
      </View>
    </View>
  );
};

export default ChatDetailHeader;

const styles = StyleSheet.create({
  header__wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#c2c2c2',
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 4,
      height: 4,
    },
  },
  content__wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar__wrapper: {
    width: 40,
    aspectRatio: 1 / 1,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
});
