import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Dialog, DialogProps, Text } from 'react-native-paper';

interface IAlertDialog {
  visible: boolean;
  hideDialog?: any;
}

const AlertDialog = ({ visible, hideDialog }: IAlertDialog) => {
  return (
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title>Cancel Order</Dialog.Title>
      <Dialog.Content>
        <Text variant='bodyMedium'>This is simple dialog</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({});
