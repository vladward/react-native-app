import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { THEME } from '../styles/theme';
import { CONSTANTS } from '../constants';
import { GetPosterPath } from '../utils/getPosterPath';
import { NowPlayingResultsType } from '../types/types';

const width = Dimensions.get('window').width;

export const Card: FC<CardType> = ({ cardData, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.image}
          source={{
            uri: GetPosterPath(cardData.poster_path),
          }}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
          {cardData.title}
        </Text>
        <Text style={styles.text}>{new Date(cardData.release_date).getFullYear()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width / 2 - 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 15,
  },
  image: {
    width: 92,
    height: 138,
    resizeMode: 'stretch',
  },
  text: {
    color: THEME.TEXT,
    marginTop: 5,
    fontSize: CONSTANTS.TEXT16,
  },
});

type CardType = {
  cardData: NowPlayingResultsType;
  onPress?: () => void;
};
