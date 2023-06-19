import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface IMyTextInput extends TextInputProps {
  icon?: any;
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const MyTextInput = ({
  placeholder,
  textStyle,
  wrapperStyle,
  icon,
  ...props
}: IMyTextInput) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <TextInput
        placeholder={placeholder ?? 'Something...'}
        style={[styles.text__input, textStyle]}
        placeholderTextColor={'#e1e1e1'}
        {...props}
      />
      {icon}
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  wrapper: {
    minWidth: 200,
    width: '100%',
    paddingBottom: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  text__input: {
    width: '100%',
    height: 'auto',
    padding: 0,
    borderWidth: 0,
    flexGrow: 1,
    color: '#fff',
    fontSize: 18,
  },
});
