import { StyleSheet, AppState, FlatList, View } from 'react-native';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import MySafeArea from '../components/MySafeArea';
import interceptor from '../services/interceptor';
import { useAppDispatch } from '../redux/reduxHook';
import { fetchUserInfo } from '../redux/thunks/user.thunk';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ChatHeader from '../components/screens/ChatScreen/ChatHeader';
import RoomChatCard from '../components/screens/ChatScreen/RoomChatCard';
import signalRService from '../helpers/signalRConnection';
import { useIsFocused } from '@react-navigation/native';

interface IChatScreen extends NativeStackScreenProps<any, 'Chat', 'mystack'> {}

const ChatScreen = ({ navigation }: IChatScreen) => {
  const [roomChats, setRoomChats] = useState();
  const appState = useRef(AppState.currentState);

  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchRoomChats = async () => {
      try {
        const res = await interceptor.get('/chats/rooms');
        console.log(res.data);
        if (res.data.succeeded) {
          setRoomChats(res.data.datas);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // signalRService.startConnection();

    fetchRoomChats();

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('Reconnect');
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      // signalRService.stopConnection();
    };
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <MySafeArea>
      <ChatHeader />
      <View
        style={{
          paddingTop: 20,
        }}
      >
        {roomChats && (
          <FlatList
            data={roomChats}
            renderItem={({ item }) => (
              <RoomChatCard data={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        )}
      </View>
    </MySafeArea>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
