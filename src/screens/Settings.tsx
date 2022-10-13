import { Image, StyleSheet, Text, View } from 'react-native';
import { THEME } from '../styles/theme';
import { CONSTANTS } from '../constants';

export const Settings = () => {
  return (
    <View style={styles.settings}>
      <Text style={styles.text}>API Provided by:</Text>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/imdb_logo.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.DARK,
  },
  text: {
    color: THEME.TEXT,
    fontSize: CONSTANTS.TEXT16,
    marginBottom: 30,
  },
  logoContainer: {
    width: 200,
    height: 200,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 35,
  },
});
