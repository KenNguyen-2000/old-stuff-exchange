import { StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import MessageCard from './MessageCard';
// import messages from './messages.json';
import { FlatList } from 'react-native-gesture-handler';

const MessagesContent = ({ messages }: any) => {
  return (
    <FlatList
      data={messages}
      ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
      renderItem={({ item }) => <MessageCard message={item} />}
      keyExtractor={(item, index) => index.toString()}
      inverted
      style={styles.wrapper}
    />
  );
};

export default MessagesContent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
});
