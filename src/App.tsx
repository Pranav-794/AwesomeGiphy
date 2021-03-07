/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';

import Axios from 'axios';
import {Giphy} from './Giphy';
import styles from './styles';
import GiphyContainer from './Components/GiphyContainer';
import RecentSearchContainer from './Components/RecentSearchContainer';
import PaginationController from './Components/PaginationController';
import SearchInput from './Components/SearchInput';

const LIMIT = 50;
const API_KEY = 'brXMsD0cTFgrd7yQh6u17ilSMIhDz2t9';

const App = () => {
  const [value, onChangeText] = useState('');
  const [searchedTerm, onSearched] = useState('');
  const [numPages, setNumOfPages] = useState(0);
  const [page, setPage] = useState(0);
  const [recentSearches, setRecentSearch] = useState<{
    [term: string]: {pages: Array<Array<Giphy>>; totalPages: number};
  }>({});

  const onInitialSearch = async () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${value}&limit=${LIMIT}`;
    const resp = await Axios.get(url);
    if (resp.data.data.length > 0) {
      const pagination = resp.data.pagination;
      const numOfPages = Math.ceil(pagination.total_count / LIMIT);
      setNumOfPages(numOfPages);

      const gifs = resp.data.data.map((item: any) => ({
        id: item.id,
        url: `https://media.giphy.com/media/${item.id}/giphy.gif`,
      }));
      setPage(1);
      const pastSearches = {...recentSearches};
      pastSearches[value] = {pages: [gifs], totalPages: numOfPages};
      setRecentSearch(pastSearches);
      onSearched(value);
    } else {
      onSearched('');
      setNumOfPages(0);
      setRecentSearch({});
      setPage(0);
    }
  };

  const onSearch = () => {
    if (recentSearches[value]) {
      onSearched(value);
      setNumOfPages(recentSearches[value].totalPages);
      setPage(1);
      onChangeText(value);
    } else {
      onInitialSearch();
    }
  };

  const onNextPage = async () => {
    if (recentSearches[searchedTerm].pages[page] === undefined) {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=brXMsD0cTFgrd7yQh6u17ilSMIhDz2t9&q=${searchedTerm}?&offset=${
        LIMIT * page + 1
      }`;
      const resp = await Axios.get(url);
      if (resp.data.data.length > 0) {
        const gifs = resp.data.data.map((item: any) => ({
          id: item.id,
          url: `https://media.giphy.com/media/${item.id}/giphy.gif`,
        }));
        const pastSearches = {...recentSearches};
        pastSearches[searchedTerm].pages.push(gifs);
        setRecentSearch(pastSearches);
      }
    }
    setPage(page + 1);
  };

  const onPreviousPage = () => {
    setPage(page - 1);
  };

  const recentSearchTerms = Object.keys(recentSearches);

  const onPreviousTermSelected = (term: string) => {
    onSearched(term);
    setNumOfPages(recentSearches[term].totalPages);
    setPage(1);
    onChangeText(term);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <SearchInput
          value={value}
          onChangeText={onChangeText}
          onSearch={onSearch}
        />
        <RecentSearchContainer
          recentSearchTerms={recentSearchTerms}
          onPreviousTermSelected={onPreviousTermSelected}
        />
        <GiphyContainer
          listData={
            searchedTerm ? recentSearches[searchedTerm].pages[page - 1] : []
          }
        />
        <PaginationController
          numPages={numPages}
          page={page}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
