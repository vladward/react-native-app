import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { THEME } from '../../styles/theme';
import { MovieType, NowPlayingResultsType, NowPlayingType } from '../../types/types';
import { FavoriteMovieCard, Pagination } from '../../components';
import { CONSTANTS, DEVICE_WIDTH } from '../../constants';
import { useAuthContext } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { API } from '../../api';
import { textTranslate } from '../../utils';

export const FavoriteList = () => {
  const { currentUser, sessionId } = useAuthContext();

  const { language, setFavoriteMoviesIds, setParentPage } = useAppContext();

  const [favoriteMovies, setFavoriteMovies] = useState<NowPlayingType>();

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    API.getFavoriteMovies(currentUser?.id, sessionId, 'created_at.asc', currentPage, language).then(
      (data) => {
        setFavoriteMovies(data);
        setFavoriteMoviesIds(data?.results?.map((movie: MovieType) => movie.id));
      }
    );
  }, [currentPage, language]);

  const render: ListRenderItem<NowPlayingResultsType> = ({ item }) => {
    return <FavoriteMovieCard item={item} setParentPage={setParentPage} />;
  };

  if (!favoriteMovies?.results) {
    return (
      <View style={styles.favoriteContainerLoader}>
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
    <View style={styles.favoriteListContainer}>
      <FlatList<NowPlayingResultsType>
        horizontal={false}
        data={favoriteMovies?.results}
        renderItem={render}
        keyExtractor={(item, index) => {
          return item.id.toString() + index.toString();
        }}
        ListFooterComponent={
          <Pagination
            paginate={setCurrentPage}
            currentPage={currentPage as number}
            totalCount={favoriteMovies?.total_results as number}
            pageSize={20}
            siblingCount={2}
          />
        }
        ListFooterComponentStyle={styles.paginationListFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteContainerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: THEME.DARK,
  },
  favoriteListContainer: {
    flex: 1,
    backgroundColor: THEME.DARK,
    width: DEVICE_WIDTH,
  },
  notFoundText: {
    color: THEME.TEXT,
    marginBottom: 10,
    fontSize: CONSTANTS.TEXT16,
  },
  paginationListFooter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
