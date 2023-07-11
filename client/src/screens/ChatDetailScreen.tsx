import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import {
  NativeStackHeaderProps,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { IconButton, Text, TextInput } from 'react-native-paper';
import MySafeArea from '../components/MySafeArea';

import MessagesContent from '../components/screens/ChatDetailScreen/MessagesContent';
import ChatDetailHeader from '../components/screens/ChatDetailScreen/ChatDetailHeader';

interface IChatDetailScreen
  extends NativeStackScreenProps<any, 'ChatDetail', 'mystack'> {}

const ChatDetailScreen = ({ navigation, route }: IChatDetailScreen) => {
  const { data }: any = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ChatDetailHeader navigation={navigation} user={data} />
        <MessagesContent />

        <View style={styles.footer__wrapper}>
          <View>
            <TextInput
              style={styles.message__input}
              mode='outlined'
              outlineColor='#c2c2c2'
              outlineStyle={{ borderRadius: 999 }}
              placeholder='Type your message here'
              placeholderTextColor={'grey'}
              right={
                <TextInput.Icon
                  icon={'send'}
                  onPress={() => console.log('send')}
                  forceTextInputFocus={false}
                />
              }
            />
          </View>
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  body__wrapper: {
    flex: 1,
    // flexShrink: 1,
  },

  footer__wrapper: {
    minHeight: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 18,
  },
  message__input: {
    backgroundColor: 'white',
    marginTop: -8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 4,
      height: 0,
    },
  },
});
