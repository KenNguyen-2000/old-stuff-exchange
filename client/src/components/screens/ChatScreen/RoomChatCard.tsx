import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button, MD3Colors, Text } from 'react-native-paper';

const RoomChatCard = ({ data, navigation }: any) => {
  const handleGoDetail = () => {
    navigation.navigate('ChatDetail', {
      data: data,
    });
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={handleGoDetail}>
      <View style={styles.avatar__wrapper}></View>
      <View style={styles.content__wrapper}>
        <View style={styles.content__top}>
          <Text>{data.name}</Text>
          <Text style={{ color: MD3Colors.secondary60 }}>{data.time}</Text>
        </View>
        <View style={styles.content__bottom}>
          <View style={{ flexShrink: 1 }}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.message}>
              {data.message}
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
