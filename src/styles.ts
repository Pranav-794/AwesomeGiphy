import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: '5%',
    borderColor: 'gray',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    marginHorizontal: '5%',
    width: '80%',
    borderRadius: 8,
  },
  searchIconContainer: {alignSelf: 'center'},
  searchIcon: {height: 20, width: 20, tintColor: 'red'},
  recentSearchContainer: {
    height: 50,
    marginHorizontal: '4%',
    marginTop: '4%',
    marginBottom: '4%',
  },
  recentSearchItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#E0E5EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentSearchIcon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    marginRight: 4,
  },
  recentSearchText: {fontSize: 15, alignSelf: 'center'},
  giphyContainer: {flexDirection: 'column', marginTop: 40},
  giphy: {width: '40%', height: 150, margin: 20},
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    marginBottom: 10,
  },
  paginateArrow: {alignSelf: 'center', marginHorizontal: 30},
  paginateIcon: {tintColor: 'red', height: 40, width: 40},
  paginateText: {alignSelf: 'center', fontSize: 20},
});
