import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHook';
import { fetchUserInfo } from '../../../redux/thunks/user.thunk';

const HomeBanner = () => {
  const userInfo = useAppSelector((state) => state.user.user);
  const orders = useAppSelector((state) => state.orders.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userInfo) dispatch(fetchUserInfo());
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.card__wrapper}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <Text style={{ fontSize: 16 }}>Balance</Text>
            <Text variant='displayMedium'>{userInfo?.points ?? 0} Points</Text>
          </View>
          <View style={{ alignSelf: 'flex-end' }}>
            <Entypo name='wallet' size={28} color={'#497fea'} />
          </View>
        </View>
        <View style={styles.card__wrapper}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <Text style={{ fontSize: 16 }}>Rate</Text>
            <Text variant='displayMedium'>{orders[0].item.name ?? 0}</Text>
          </View>
          <View style={{ alignSelf: 'flex-end' }}>
            <AntDesign
              name='star'
              size={28}
              color={'#f3da19'}
              style={{
                transform: [{ rotate: '15deg' }],
              }}
            />
          </View>
        </View>
        <View style={styles.card__wrapper}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <Text style={{ fontSize: 16 }}>Use Points</Text>
            <Text variant='displayMedium'>{userInfo?.points ?? 0} Points</Text>
          </View>
          <View style={{ alignSelf: 'flex-end' }}>
            <FontAwesome5
              name='crown'
              size={28}
              color={'#fabc03'}
              style={{
                transform: [{ rotate: '-20deg' }],
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  card__wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    // minHeight: 60,
    minWidth: 140,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
