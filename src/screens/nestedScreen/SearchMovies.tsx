import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import { SearchMoviesType, NowPlayingResultsType, useAppNavigation } from '../../types/types';
import { useEffect, useState } from 'react';
import { Card, Pagination } from '../../components';
import { THEME } from '../../styles/theme';
import { API } from '../../api';
import { CONSTANTS } from '../../constants';
import { useAppContext } from '../../context/AppContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { textTranslate } from '../../utils';

export const SearchMovies = () => {
  const [allMoviesData, setAllMoviesData] = useState<SearchMoviesType>();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [value, setValue] = useState('');

  const navigation = useAppNavigation();

  const { language, setParentPage } = useAppContext();

  useEffect(() => {
    API.searchMovies(currentPage, value, language).then((data) => setAllMoviesData(data));
  }, [currentPage, language, value]);

  const render: ListRenderItem<NowPlayingResultsType> = ({ item }) => {
    return (
      <Card
        cardData={item}
        onPress={() => {
          setParentPage('SearchMoviesList');
          navigation.navigate('SearchMovies', {
            screen: 'AllSingleMovie',
            params: { id: item.id, name: item.title },
          });
        }}
      />
    );
  };

  if (!allMoviesData) {
    return (
      <View style={styles.nowPlayingContainerLoader}>
        <Text style={styles.notFoundText}>
          {textTranslate(language, 'Loading ...', 'Загрузка ...')}
        </Text>
        <Text>
          <ActivityIndicator size="large" color={THEME.BLUE} />;
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      activeOpacity={1}
      style={styles.listContainer}
    >
      <View style={styles.listWrapper}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={THEME.LIGHT_TEXT}
          style={styles.input}
          value={value}
          onChangeText={setValue}
        />
        {!allMoviesData?.results?.length ? (
          <>
            <Text style={styles.notFoundText}>
              {textTranslate(language, 'No results', 'Список пуст')}
            </Text>
            <FontAwesome5 name="sad-tear" size={24} color={THEME.TEXT} />
          </>
        ) : (
          <FlatList<NowPlayingResultsType>
            horizontal={false}
            data={allMoviesData?.results}
            renderItem={render}
            keyExtractor={(item, index) => {
              return item.id.toString() + index.toString();
            }}
            numColumns={2}
            ListFooterComponent={
              <Pagination
                paginate={setCurrentPage}
                currentPage={currentPage as number}
                totalCount={allMoviesData?.total_results as number}
                pageSize={20}
                siblingCount={1}
              />
            }
            onScroll={() => Keyboard.dismiss()}
            ListFooterComponentStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nowPlayingContainerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: THEME.DARK,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: THEME.DARK,
    justifyContent: 'center',
    borderWidth: 0,
  },
  listWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
  notFoundText: {
    color: THEME.TEXT,
    marginVertical: 10,
    fontSize: CONSTANTS.TEXT16,
  },
  text: {
    color: THEME.TEXT,
  },
  input: {
    width: 200,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.LIGHT_TEXT,
    borderRadius: 10,
    color: THEME.TEXT,
  },
});
