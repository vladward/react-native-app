import { Text, StyleSheet, View } from 'react-native';
import { FC } from 'react';
import { THEME } from '../styles/theme';

export const Card: FC<CardType> = ({ cardData }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageWrapper} />
      <Text style={styles.text}>Top Gun: Maverick</Text>
      <Text style={styles.text}>Released: 5/23/2022</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    marginHorizontal: 5,
    marginBottom: 15,
  },
  imageWrapper: {
    width: 190,
    height: 198,
    backgroundColor: 'green',
  },
  text: {
    color: THEME.TEXT,
    marginTop: 5,
  },
});

type CardType = {
  cardData: any;
};
