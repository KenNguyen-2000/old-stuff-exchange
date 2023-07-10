import { StyleSheet, AppState } from 'react-native';
import { Button, Text } from 'react-native-paper';
import React, { useEffect, useState, useRef } from 'react';
import MySafeArea from '../components/MySafeArea';
import * as signalR from '@microsoft/signalr';
import interceptor from '../services/interceptor';
import { useAppDispatch, useAppSelector } from '../redux/reduxHook';
import { fetchUserInfo } from '../redux/thunks/user.thunk';
import * as SecureStorage from 'expo-secure-store';

const ChatScreen = ({ navigation }: any) => {
  const [chatConnection, setChatConnection] = useState<signalR.HubConnection>();
  const [message, setMessage] = useState('');
  const appState = useRef(AppState.currentState);

  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.user);

  const handleSendMessage = () => {
    console.log(userInfo, chatConnection?.state);
    if (
      !userInfo ||
      !chatConnection ||
      chatConnection.state !== signalR.HubConnectionState.Connected
    ) {
      return;
    }

    const sendMessageDto = {
      SenderId: userInfo.id,
      RecieverId: 2,
      Content: 'Hello World',
    };
    if (chatConnection) {
      chatConnection
        .invoke('SendMessage', sendMessageDto)
        .catch(function (err) {
          return console.error(err.toString());
        });
    }
  };

  const reconnect = async () => {
    if (
      chatConnection &&
      chatConnection.state === signalR.HubConnectionState.Disconnected
    ) {
      try {
        await chatConnection.start();
        console.log('SignalR reconnected');
        setChatConnection(chatConnection);
      } catch (error) {
        console.log('SignalR reconnection error: ', error);
      }
    }
  };

  useEffect(() => {
    const initialConnection = async () => {
      const getToken = await SecureStorage.getItemAsync('token');
      if (getToken == null) navigation.navigate('Login');
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(interceptor.getUri() + '/hub', {
          accessTokenFactory: () => getToken as string,
        })
        .build();

      setChatConnection(connection);

      try {
        await connection.start();
        console.log('Connection started!');

        connection.on('ReceiveMessage', (sender, reciever, message) => {
          console.log('Recieved message', sender, reciever, message);
          console.warn(
            `SenderId ${sender} send to RecieverId ${reciever} message: ${message}`
          );
        });
      } catch (error) {
        console.log('Error while establishing connection :(', error);
      }
    };

    const fetchUser = async () => {
      await dispatch(fetchUserInfo());
    };

    const fetchRoomChats = async () => {
      try {
        const res = await interceptor.get('/chats/rooms');
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    initialConnection();
    fetchRoomChats();

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('Reconnect');
        reconnect();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <MySafeArea>
      <Text>ChatScreen</Text>
      <Button onPress={handleSendMessage}>Send Message </Button>
    </MySafeArea>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
