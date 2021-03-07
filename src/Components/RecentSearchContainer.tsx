import React from 'react';
import {FlatList, Image, Text, TouchableOpacity} from 'react-native';
import styles from '../styles';

const RecentSearchContainer = (props: {
  recentSearchTerms: Array<string>;
  onPreviousTermSelected: (item: string) => void;
}) => {
  const {recentSearchTerms, onPreviousTermSelected} = props;
  const RecentSearchItem = (searchItemProps: {item: any}) => {
    const {item} = searchItemProps;
    return (
      <TouchableOpacity
        key={String(item.index)}
        style={styles.recentSearchItem}
        onPress={() => onPreviousTermSelected(item.item)}>
        <Image
          style={styles.recentSearchIcon}
          source={require('../../Images/previous.png')}
        />
        <Text style={styles.recentSearchText}>{item.item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.recentSearchContainer}
      horizontal
      data={recentSearchTerms.reverse()}
      renderItem={(item) => <RecentSearchItem item={item} />}
    />
  );
};

export default RecentSearchContainer;
