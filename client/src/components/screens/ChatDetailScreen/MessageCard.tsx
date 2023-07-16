import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Avatar, MD3Colors, Text } from 'react-native-paper';
import useUserInfo from '../../../hooks/useUserInfo';
import { useAppSelector } from '../../../redux/reduxHook';

const MessageCard = ({ message }: any) => {
  const userInfo = useAppSelector((state) => state.user.user)!;

  return (
    <View
      style={[
        styles.wrapper,
        {
          alignSelf:
            message.sender.id !== userInfo.id ? 'flex-start' : 'flex-end',
        },
      ]}
    >
      {message.sender.id !== userInfo.id && (
        <View
          style={{
            width: 38,
            aspectRatio: 1 / 1,
            borderRadius: 999,
            backgroundColor: '#333',
            flexShrink: 0,
            alignSelf: 'flex-end',
          }}
        >
          {!message.sender?.imageUri ? (
            <Avatar.Icon size={38} icon='account' />
          ) : (
            <Image
              source={{
                uri: message.sender.imageUri,
              }}
              style={{
                width: '100%',
                aspectRatio: 1 / 1,
                resizeMode: 'cover',
              }}
            />
          )}
        </View>
      )}
      <View style={styles.right__wrapper}>
        <View
          style={[
            styles.message__wrapper,
            {
              backgroundColor:
                message.sender.id !== userInfo.id
                  ? '#eaeaea'
                  : MD3Colors.primary80,
            },
          ]}
        >
          <Text>{message.content}</Text>
        </View>
        {/* <Text>{new Date(message.updatedDate).toUTCString()}</Text> */}
      </View>
    </View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    maxWidth: '60%',
  },
  right__wrapper: {
    display: 'flex',
    gap: 12,
  },
  message__wrapper: {
    flex: 1,
    maxWidth: '100%',
    paddingRight: 12,
    paddingLeft: 16,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#eaeaea',
  },
});
