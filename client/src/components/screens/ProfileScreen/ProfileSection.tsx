import { StyleSheet, View } from 'react-native';
import { Text, List, MD3Colors } from 'react-native-paper';
import React from 'react';

const options = [
  'Gold',
  'Favourites',
  'Payment Methods',
  'Scheduled',
  'Saved Places',
  'Emergency Contacts',
  'Business Account',
];

const ProfileSection = () => {
  return (
    <List.Section style={styles.section__wrapper}>
      <List.Subheader style={{ paddingBottom: 0, marginLeft: -16 }}>
        <Text variant='displayMedium' style={styles.section__title}>
          My account
        </Text>
      </List.Subheader>
      {options.map((option, index) => (
        <List.Item
          key={option}
          title={<Text>{option}</Text>}
          titleStyle={styles.option__item__title}
          right={() => <List.Icon icon='chevron-right' />}
          style={[
            styles.option__item,
            { zIndex: options.length - index, position: 'relative' },
          ]}
        />
      ))}
    </List.Section>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
  section__wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: 200,
    paddingHorizontal: 14,
  },
  section__title: {
    fontSize: 18,
  },
  option__item: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#cdcdcd',
    paddingVertical: 8,
    paddingRight: 0,
  },
  option__item__title: {
    fontSize: 16,
    marginLeft: -16,
  },
});
