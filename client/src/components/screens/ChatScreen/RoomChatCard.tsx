import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Avatar, Button, MD3Colors, Text } from 'react-native-paper';
import useUserInfo from '../../../hooks/useUserInfo';
import formatDate from '../../../helpers/dateFormatter';
import { useAppSelector } from '../../../redux/reduxHook';

const RoomChatCard = ({ data, navigation }: any) => {
  const userInfo = useAppSelector((state) => state.user.user);

  const sender = data
    ? data.users.find((u: any) => u.id !== userInfo!.id)
    : null;

  const handleGoDetail = () => {
    navigation.navigate('ChatDetail', {
      data: data,
    });
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={handleGoDetail}>
      <View style={styles.avatar__wrapper}>
        {!sender?.imageUri ? (
          <Avatar.Icon size={50} icon='account' />
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
      <View style={styles.content__wrapper}>
        <View style={styles.content__top}>
          <Text>
            {data &&
              data.users.find((user: any) => user.id !== userInfo?.id).fullName}
          </Text>
          <Text style={{ color: MD3Colors.secondary60 }}>
            {formatDate(
              new Date(data.messages[data.messages.length - 1].updatedDate)
            )}
          </Text>
        </View>
        <View style={styles.content__bottom}>
          <View style={{ flexShrink: 1 }}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.message}>
              {data.messages[data.messages.length - 1].content}
            </Text>
          </View>

          <View style={styles.status__wrapper}>
            <Text variant='bodyMedium' style={{ color: '#fff', fontSize: 12 }}>
              Archived
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RoomChatCard;

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 24,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  avatar__wrapper: {
    width: 50,
    aspectRatio: 1 / 1,
    borderRadius: 9999,
    backgroundColor: '#333',
    overflow: 'hidden',
  },
  content__wrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  content__top: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content__bottom: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  message: {
    color: MD3Colors.secondary60,
  },
  status__wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: MD3Colors.secondary60,
    borderRadius: 4,
  },
});
