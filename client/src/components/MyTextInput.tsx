import { Keyboard, StyleSheet, View } from 'react-native';
import React from 'react';
import { TextInputProps, TextInput, Text } from 'react-native-paper';

interface IMyTextInput extends TextInputProps {
  title: string;
}

const MyTextInput = (props: IMyTextInput) => {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        outlineStyle={{ borderRadius: 24 }}
        mode='outlined'
        style={[
          {
            backgroundColor: 'rgba(231,224,236,1)',
          },
          props.style,
        ]}
        {...props}
        outlineColor='transparent'
        placeholderTextColor={'#8b8b8b'}
      />
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    fontSize: 18,
  },
});
