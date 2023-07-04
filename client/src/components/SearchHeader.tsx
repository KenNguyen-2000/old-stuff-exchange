import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton, Searchbar } from 'react-native-paper';

interface ISearchHeader extends NativeStackHeaderProps {
  searchText: string;
  onSearchChange: any;
}

const SearchHeader: React.FC<ISearchHeader> = ({
  searchText,
  onSearchChange,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const currentPaddingTop =
    Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight;

  const [searchQuery, setSearchQuery] = React.useState(searchText);

  return (
    <View
      style={[
        {
          paddingTop: (currentPaddingTop as number) + 12,
        },
        styles.wrapper,
      ]}
    >
      <IconButton
        icon={'keyboard-backspace'}
        onPress={() => navigation.goBack()}
      />
      <Searchbar
        placeholder='Search'
        value={searchQuery}
        onChangeText={(query: string) => {
          setSearchQuery(query);
          onSearchChange(query);
        }}
      />
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    paddingVertical: 12,
  },
});
