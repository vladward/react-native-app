import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MovieType } from '../../types/types';
import { FC, useEffect, useState } from 'react';
import { API } from '../../api';
import { GetPosterPath } from '../../utils/getPosterPath';
import { THEME } from '../../styles/theme';
import { useAppContext } from '../../context/AppContext';
import { textTranslate } from '../../utils/textTranslate';
import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '../../context/AuthContext';

export const SingleMovie: FC<any> = ({ route, navigation }) => {
  const param = route.params;
  const [movie, setMovie] = useState<MovieType>();
  const { language, favoriteMoviesIds, setFavoriteMoviesIds } = useAppContext();
  const { currentUser, sessionId } = useAuthContext();

  const handleSetFavorite = async (isFavorite: boolean) => {
    if (param?.id) {
      await API.markAsFavorite(param.id, isFavorite, currentUser.id, sessionId).then(() => {
        if (isFavorite) {
          setFavoriteMoviesIds((prev: number[]) => [...prev, Number(param?.id)]);
        } else {
          setFavoriteMoviesIds((prev: number[]) =>
            prev.filter((movieId) => movieId !== Number(param?.id))
          );
        }
      });
    }
  };

  useEffect(() => {
    if (param?.id) {
      API.getMovie(param?.id, language).then((data) => setMovie(data));
    }
  }, [language]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        favoriteMoviesIds.includes(Number(param?.id)) ? (
          <Ionicons
            onPress={() => handleSetFavorite(false)}
            name="star"
            size={24}
            color={THEME.YELLOW}
          />
        ) : (
          <Ionicons
            onPress={() => handleSetFavorite(true)}
            name="star-outline"
            size={24}
            color={THEME.TEXT}
          />
        ),
    });
  }, [navigation, param?.id, movie?.id, favoriteMoviesIds]);

  if (!movie) {
    return (
      <View style={styles.singleMovieContainerLoader}>
        <Text style={styles.loadingText}>Loading ...</Text>
        <Text>
          <ActivityIndicator size="large" color={THEME.BLUE} />;
        </Text>
      </View>
    );
  }

  const path = GetPosterPath(movie.poster_path);
  return (
    <View style={styles.singleMovieContainer}>
      <View style={styles.top}>
        <View style={styles.left}>
          <Image style={styles.image} source={{ uri: path }} />
        </View>
        <View style={styles.right}>
          <Text style={styles.titleText}>
            {textTranslate(language, 'Title', 'Название')}: {movie.original_title}
          </Text>
          <Text style={styles.text}>
            {textTranslate(language, 'Release', 'Релиз')}: {movie.release_date}
          </Text>
          <Text style={styles.text}>
            {textTranslate(language, 'Budget', 'Бюджет')}: ${movie.budget}
          </Text>
          <Text style={styles.text}>
            {textTranslate(language, 'Genres', 'Жанры')}:
            {movie.genres.map((genre, index) => (
              <Text key={index} style={styles.text} numberOfLines={1}>
                {' ' +
                  genre.name +
                  (index === movie.genres.length - 1 ? '' : ',') +
                  (movie.genres.length > 4 ? '\n' : '')}
              </Text>
            ))}
          </Text>
          <Text style={styles.text}>
            {textTranslate(language, 'Popularity', 'Популярность')}: {movie.popularity}
          </Text>
          <Text style={styles.text}>
            {textTranslate(language, 'Votes count', 'Оценок')}: {movie.vote_count}
          </Text>
          <Text style={styles.text}>
            {textTranslate(language, 'Rating', 'Рейтинг')}: {movie.vote_average}
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.textCenter}>{textTranslate(language, 'Overview', 'Описание')}</Text>
        <ScrollView>
          <Text style={styles.text}>{movie.overview}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  singleMovieContainerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: THEME.DARK,
  },
  singleMovieContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: THEME.DARK,
  },
  top: {
    flexDirection: 'row',
  },
  bottom: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: THEME.DARK,
  },
  left: {
    flexDirection: 'row',
    marginRight: 15,
  },
  right: {
    marginBottom: 15,
  },
  image: {
    width: 92,
    height: 138,
    resizeMode: 'stretch',
  },
  textCenter: {
    textAlign: 'center',
    fontWeight: '600',
    color: THEME.TEXT,
  },
  text: {
    color: THEME.TEXT,
  },
  titleText: {
    color: THEME.TEXT,
    width: 280,
  },
  loadingText: {
    color: THEME.TEXT,
    marginBottom: 10,
  },
});
