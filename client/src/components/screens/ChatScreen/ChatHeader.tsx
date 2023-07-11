import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Button, MD3Colors, Text } from 'react-native-paper';

const ChatHeader = () => {
  const [chosen, setChosen] = useState(1);

  return (
    <View style={styles.wrapper}>
      <Text variant='headlineLarge'>Messages</Text>
      <View style={styles.category__wrapper}>
        <Button
          style={[
            styles.category__btn,
            chosen === 1 ? {} : { backgroundColor: MD3Colors.primary90 },
          ]}
          mode='contained'
          onPress={() => setChosen(1)}
        >
          <Text
            variant='bodyMedium'
            style={[
              styles.btn__text,
              {
                color: chosen === 1 ? '#fff' : MD3Colors.primary50,
              },
            ]}
          >
            Chats
          </Text>
        </Button>
        <Button
          style={[
            styles.category__btn,
            chosen === 2 ? {} : { backgroundColor: MD3Colors.primary90 },
          ]}
          mode='contained'
          onPress={() => setChosen(2)}
        >
          <Text
            variant='bodyMedium'
            style={[
              styles.btn__text,
              {
                color: chosen === 2 ? '#fff' : MD3Colors.primary50,
              },
            ]}
          >
            Notifications
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  category__wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  category__btn: {
    flex: 1,
  },
  btn__text: {
    fontSize: 16,
    color: '#fff',
  },
});
