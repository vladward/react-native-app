import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { THEME } from '../../styles/theme';
import { MovieType, NowPlayingResultsType, NowPlayingType } from '../../types/types';
import { FavoriteMovieCard, Pagination } from '../../components';
import { CONSTANTS } from '../../constants';
import { useAuthContext } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { API } from '../../api';

export const FavoriteList = () => {
  const { currentUser, sessionId } = useAuthContext();
  const { language, setFavoriteMoviesIds, favoriteMoviesIds, setParentPage } = useAppContext();
  const [favoriteMovies, setFavoriteMovies] = useState<NowPlayingType>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    API.getFavoriteMovies(currentUser.id, sessionId, 'created_at.asc', currentPage, language).then(
      (data) => {
        setFavoriteMovies(data);
        setFavoriteMoviesIds(data.results.map((movie: MovieType) => movie.id));
      }
    );
  }, [currentPage, language, favoriteMoviesIds]);

  const render: ListRenderItem<NowPlayingResultsType> = ({ item }) => {
    return <FavoriteMovieCard item={item} setParentPage={setParentPage} />;
  };

  if (!favoriteMovies) {
    return (
      <View style={styles.favoriteContainerLoader}>
        <Text style={styles.notFoundText}>Loading ...</Text>
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
        scrollEnabled={false}
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
