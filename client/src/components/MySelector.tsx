import { Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import {
  TextInputProps,
  TextInput,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

interface IMySelector extends TextInputProps {
  title: string;
  datas: any[];
  value: any;
  onValueChange?: any;
  isRequire?: boolean;
}

const MySelector = (props: IMySelector) => {
  const [show, setShow] = useState(false);
  const [curValue, setCurValue] = useState(props.value);

  const handleChooseItem = (item: any) => {
    setCurValue(item.name);
    setShow(false);
    props.onValueChange(item.id);
  };

  return (
    <View style={{ position: 'relative', zIndex: 5 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>{props.title}</Text>
        {props.isRequire && <Text style={{ color: 'red' }}>*</Text>}
      </View>
      <TextInput
        outlineStyle={{ borderRadius: 24 }}
        mode='outlined'
        style={[
          {
            backgroundColor: 'rgba(231,224,236,1)',
            position: 'relative',
          },
          props.style,
        ]}
        {...props}
        value={curValue}
        outlineColor='transparent'
        onPressOut={() => setShow(!show)}
      />

      {show && (
        <View style={styles.selection__wrapper}>
          <ScrollView style={styles.selection__container}>
            {props.datas?.map((item) => (
              <TouchableRipple
                key={item.id}
                style={styles.selection__card}
                onPress={handleChooseItem.bind(null, item)}
              >
                <Text variant='bodyMedium' style={{ fontSize: 16 }}>
                  {item.name}
                </Text>
              </TouchableRipple>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default MySelector;

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    fontSize: 18,
  },
  selection__wrapper: {
    position: 'absolute',
    marginTop: 4,
    top: '100%',
    right: 0,
    left: 0,
    height: 120,
    zIndex: 100,
    backgroundColor: 'rgba(231,224,236,1)',
    borderRadius: 12,
    overflow: 'scroll',
  },
  selection__container: {
    display: 'flex',
    paddingVertical: 6,
  },
  selection__card: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
