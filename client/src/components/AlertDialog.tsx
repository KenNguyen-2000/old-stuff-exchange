import { Animated, StyleSheet, View } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { Button, Dialog, DialogProps, Portal, Text } from 'react-native-paper';
import { Easing } from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';

interface IAlertDialog {
  // visible: boolean;
  // hideDialog?: any;
  message: string;
  onDismiss: () => void;
}

const AlertDialog = ({ message, onDismiss }: IAlertDialog) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        easing: Easing.back(),
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        easing: Easing.back(),
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  return (
    <TouchableWithoutFeedback accessible={false} onPress={onDismiss}>
      <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
        <View style={styles.message__wrapper}>
          <Entypo name='info-with-circle' color={'#fff'} size={30} />
          <Text
            variant='bodyLarge'
            style={{ color: '#fff', textAlign: 'left' }}
          >
            {message}
          </Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message__wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 18,
    backgroundColor: 'rgba(0,0,0,.7)',
    minWidth: 200,
    minHeight: 100,
    maxWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    gap: 12,
  },
});
