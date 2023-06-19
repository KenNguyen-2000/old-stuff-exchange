import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface IButtonOutlined {
  title: string;
  onPress: any;
}

const ButtonOutlined = ({title, onPress}: IButtonOutlined) => {
  return (
    <TouchableOpacity style={styles.button__wrapper} onPress={onPress}>
      <Text style={styles.button__text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonOutlined;

const styles = StyleSheet.create({
  button__wrapper: {
    width: 120,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#e1e1e1',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button__text: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 16,
    color: '#e1e1e1',
  },
});
