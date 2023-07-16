import { StyleSheet, View } from 'react-native';
import React, { useMemo, useRef, useCallback, useEffect } from 'react';
import MySafeArea from '../components/MySafeArea';
import { OrderList } from '../components/screens/OrderScreen';
import { Button, Portal, Text } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/reduxHook';

interface IOrderScreen
  extends NativeStackScreenProps<any, 'Order', 'my-stack'> {}

const OrderScreen: React.FC<IOrderScreen> = ({ navigation, route }) => {
  const userInfo = useAppSelector((state) => state.user.user);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['100%', '100%'], []);

  const showBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <MySafeArea style={{ ...styles.wrapper }}>
      <Text style={styles.title__h1}>Activity</Text>
      <Text style={styles.title__h2}>Recent</Text>

      {userInfo ? (
        <OrderList
          showBottomSheet={showBottomSheet}
          navigation={navigation}
          route={route}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Text>Login Is Required</Text>
          <Button
            mode='outlined'
            style={{ borderRadius: 8 }}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Button>
        </View>
      )}
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
          handleStyle={{ display: 'none' }}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
            <Button
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
            >
              Close
            </Button>
          </View>
        </BottomSheet>
      </Portal>
    </MySafeArea>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 18,
  },
  title__h1: {
    fontSize: 28,
    marginBottom: 24,
  },
  title__h2: {
    fontSize: 20,
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
