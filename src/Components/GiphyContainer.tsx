import React from 'react';
import {FlatList, Image} from 'react-native';
import {Giphy} from '../Giphy';
import styles from '../styles';

const GiphyContainer = (props: {listData: Array<Giphy>}) => {
  const {listData} = props;
  const GiphyItem = (giphyProps: {item: Giphy}) => {
    const {item} = giphyProps;
    return (
      <Image
        key={String(item.id)}
        style={styles.giphy}
        source={{
          uri: item.url,
        }}
      />
    );
  };

  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={styles.giphyContainer}
      data={listData}
      renderItem={(item) => <GiphyItem item={item.item} />}
    />
  );
};

export default GiphyContainer;
