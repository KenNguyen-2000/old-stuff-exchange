import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MessageCard = ({ message }: any) => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          alignSelf: message.senderId === 1 ? 'flex-start' : 'flex-end',
        },
      ]}
    >
      <View style={styles.message__wrapper}>
        <Text>{message.content}</Text>
      </View>
      <Text>3:18</Text>
    </View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    gap: 12,
    maxWidth: '65%',
  },
  message__wrapper: {
    maxWidth: '100%',
    paddingRight: 12,
    paddingLeft: 16,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#eaeaea',
  },
});
