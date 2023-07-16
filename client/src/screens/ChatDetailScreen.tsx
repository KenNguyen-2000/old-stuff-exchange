import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TextInput } from 'react-native-paper';
import * as signalR from '@microsoft/signalr';
import { useAppSelector } from '../redux/reduxHook';
import {
  ChatDetailHeader,
  MessagesContent,
} from '../components/screens/ChatDetailScreen';
import signalRService from '../helpers/signalRConnection';
import { useIsFocused } from '@react-navigation/native';
import AlertDialog from '../components/AlertDialog';

interface IChatDetailScreen
  extends NativeStackScreenProps<any, 'ChatDetail', 'mystack'> {}

const ChatDetailScreen = ({ navigation, route }: IChatDetailScreen) => {
  const connection = signalRService.getConnection();
  const { data }: any = route.params;
  const userInfo = useAppSelector((state) => state.user.user);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(
    data.messages.sort((a: any, b: any) =>
      new Date(a.updatedDate).getTime() > new Date(b.updatedDate).getTime()
        ? -1
        : 1
    )
  );
  const [showDialog, setShowDialog] = useState({
    isShow: false,
    message: '',
  });

  const isFocused = useIsFocused();

  const handleSendMessage = () => {
    // console.log(userInfo, connection, connection.state, message);
    if (
      !userInfo ||
      !connection ||
      connection.state !== signalR.HubConnectionState.Connected ||
      message === ''
    ) {
      return;
    }
    const sendMessageDto = {
      roomId: data.id ? data.id : 0,
      senderId: userInfo.id,
      recieverId: data.users.find((u: any) => u.id !== userInfo.id).id,
      content: message,
    };

    console.log(sendMessageDto);

    if (connection) {
      connection
        .invoke('SendMessage', sendMessageDto)
        .then((res) => {
          console.log(res);
          console.log('New Id: ', messages[0].id + 1);
          setMessages((prev: any) => [
            {
              id: messages[0].id + 1,
              content: message,
              sender: {
                id: userInfo.id,
              },
              updatedDate: new Date(),
            },
            ...prev,
          ]);
          setMessage('');
        })
        .catch(function (err: any) {
          handleShowDialog(err.toString());
          return console.error(err.toString());
        });
    }
  };

  const handleShowDialog = (message: string) => {
    setShowDialog({
      isShow: true,
      message: message,
    });

    // After 2 seconds, hide the dialog
    setTimeout(() => {
      setShowDialog({
        isShow: false,
        message: '',
      });
    }, 2600);
  };

  useEffect(() => {
    signalRService.startConnection();
    connection.on('ReceiveMessage', (sender, reciever, message) => {
      setMessages((prev: any) => [
        {
          id: messages.length + messages[0].id + 1,
          content: message,
          sender: {
            id: sender,
          },
          updatedDate: new Date(),
        },
        ...prev,
      ]);
    });

    return () => {
      signalRService.stopConnection();
    };
  }, []);

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
        <ChatDetailHeader
          navigation={navigation}
          sender={data.users.find((u: any) => u.id !== userInfo!.id)}
        />
        {messages.length > 0 && <MessagesContent messages={messages} />}

        <View style={styles.footer__wrapper}>
          <View>
            <TextInput
              style={styles.message__input}
              mode='outlined'
              outlineColor='#c2c2c2'
              outlineStyle={{ borderRadius: 999 }}
              placeholder='Type your message here'
              placeholderTextColor={'grey'}
              onChangeText={(text) => setMessage(text)}
              value={message}
              right={
                <TextInput.Icon
                  icon={'send'}
                  onPress={handleSendMessage}
                  forceTextInputFocus={false}
                />
              }
            />
          </View>
        </View>
      </View>
      {showDialog.isShow && (
        <AlertDialog
          message={showDialog.message}
          onDismiss={() => setShowDialog({ isShow: false, message: '' })}
        />
      )}
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
