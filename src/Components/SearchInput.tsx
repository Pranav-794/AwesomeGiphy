import React from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../styles';

const SearchInput = (props: {
  value: string;
  onChangeText: (term: string) => void;
  onSearch: () => void;
}) => {
  const {value, onChangeText, onSearch} = props;
  return (
    <View style={styles.searchHeader}>
      <TextInput
        autoCapitalize="none"
        onSubmitEditing={onSearch}
        placeholder={'Search for Giphy'}
        style={styles.searchInput}
        onChangeText={(text: any) => onChangeText(text)}
        value={value}
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchIconContainer}>
        <Image
          style={styles.searchIcon}
          source={require('../../Images/loupe.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
