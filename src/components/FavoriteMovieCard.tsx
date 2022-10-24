import { THEME } from '../styles/theme';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { textTranslate, GetPosterPath } from '../utils';
import { NowPlayingResultsType, useAppNavigation } from '../types/types';
import { useAppContext } from '../context/AppContext';
import { DEVICE_WIDTH } from '../constants';

type FavoriteCardType = {
  setParentPage: (page: string) => void;
  item: NowPlayingResultsType;
};

export const FavoriteMovieCard = ({ setParentPage, item }: FavoriteCardType) => {
  const navigation = useAppNavigation();

  const { language } = useAppContext();

  const path = GetPosterPath(item.poster_path);
  return (
    <Pressable
      key={item.id}
      onPress={() => {
        setParentPage('Favorite');
        navigation.navigate('Favorite', {
          screen: 'FavoriteSingleMovie',
          params: { id: item.id, name: item.title },
        });
      }}
      style={styles.favoriteMovieCardWrapper}
    >
      <View style={styles.left}>
        <Image style={styles.image} source={{ uri: path }} />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.text}>
          {textTranslate(language, 'Title', 'Название')}: {item.title}
        </Text>
        <Text style={styles.text}>
          {textTranslate(language, 'Release', 'Релиз')}: {item.release_date}
        </Text>
        <Text style={styles.text}>
          {textTranslate(language, 'Rating', 'Рейтинг')}: {item.vote_average}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  favoriteMovieCardWrapper: {
    width: DEVICE_WIDTH,
    backgroundColor: THEME.DARK,
    marginVertical: 5,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: THEME.LIGHT_TEXT,
    borderRadius: 10,
  },
  text: {
    color: THEME.TEXT,
    fontSize: 20,
    width: DEVICE_WIDTH - 120,
  },
  left: {
    flexDirection: 'row',
    marginRight: 15,
  },
  image: {
    width: 80,
    height: 110,
    resizeMode: 'contain',
  },
});
