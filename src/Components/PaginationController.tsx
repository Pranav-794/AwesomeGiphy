import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';

const PaginationController = (props: {
  page: number;
  numPages: number;
  onPreviousPage: () => void;
  onNextPage: () => {};
}) => {
  const {page, numPages, onPreviousPage, onNextPage} = props;
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        disabled={page === 1}
        onPress={onPreviousPage}
        style={styles.paginateArrow}>
        <Image
          style={styles.paginateIcon}
          source={require('../../Images/left.png')}
        />
      </TouchableOpacity>
      <Text style={styles.paginateText}>{`${page} / ${numPages}`}</Text>
      <TouchableOpacity
        disabled={page === numPages}
        onPress={onNextPage}
        style={styles.paginateArrow}>
        <Image
          style={styles.paginateIcon}
          source={require('../../Images/right.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PaginationController;
