import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from 'react-native';
import { THEME } from '../styles/theme';
import { CONSTANTS } from '../constants';
import { Switcher } from '../components';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import { textTranslate } from '../utils/textTranslate';
import { useAuthContext } from '../context/AuthContext';
import { API } from '../api';
import { AsyncStore } from '../utils/async-store';

export const Settings = () => {
  const { setLanguage, language, isLoading, setIsLoading } = useAppContext();

  const { setIsAuth, sessionId, setSessionId } = useAuthContext();

  const [value, setValue] = useState<'ru' | 'eng'>('eng');

  const handleDeleteValue = async () => await AsyncStore.deleteValue('sessionId');

  const handleLogout = async () => {
    setIsLoading(true);
    await API.deleteSession(sessionId)
      .then((res: any) => {
        if (res.success) {
          setIsAuth(false);
          setSessionId(null);
          handleDeleteValue();
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <View style={styles.settings}>
      <Text style={styles.text}>API {textTranslate(language, 'Provided by', 'Предоставлен')}:</Text>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/imdb_logo.png')} />
      </View>
      <View>
        <Switcher
          language={language}
          value={value}
          onChange={(value) => {
            setValue(value);
            setLanguage(value === 'eng' ? 'en-US' : 'ru-RUS');
          }}
          text1="ru"
          text2="eng"
        />
      </View>
      <View style={styles.btnContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={THEME.BLUE} />
        ) : (
          <Button
            title={textTranslate(language, 'Log out', 'Выйти')}
            color={THEME.BLUE}
            onPress={handleLogout}
          />
        )}
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
  btnContainer: {
    width: 100,
  },
});
