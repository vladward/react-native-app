import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Linking,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { THEME } from '../styles/theme';
import { API } from '../api';
import { useAuthContext } from '../context/AuthContext';
import { ERROR_MESSAGES } from '../constants';
import { useAppContext } from '../context/AppContext';
import { AsyncStore } from '../utils';

export const Login = () => {
  const { setIsAuth, setSessionId } = useAuthContext();

  const { isLoading, setIsLoading } = useAppContext();

  const [login, setLogin] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleLogin = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    setError('');
    API.createRequestToken()
      .then((res: any) => {
        if (res.success) {
          return res;
        } else {
          setError(ERROR_MESSAGES.INCORRECT_LOGIN_OR_PASSWORD);
        }
      })
      .then((res: any) => {
        if (res.success) {
          return API.validateUser(login, password, res.request_token);
        } else {
          setError(ERROR_MESSAGES.INCORRECT_LOGIN_OR_PASSWORD);
        }
      })
      .then((res: any) => {
        if (res.success) {
          return API.makeSession(res.request_token).then((res: any) => {
            if (res.success) {
              setIsAuth(true);
              setSessionId(res.session_id);
              AsyncStore.setValue('sessionId', res.session_id);
            } else setError(ERROR_MESSAGES.INCORRECT_LOGIN_OR_PASSWORD);
          });
        } else setError(ERROR_MESSAGES.INCORRECT_LOGIN_OR_PASSWORD);
      })
      .finally(() => setIsLoading(false));
  };

  const handleOpenRegisterPage = () => {
    const url = 'https://www.themoviedb.org/signup';
    return Linking.openURL(url);
  };

  const handleOpenForgotPassPage = () => {
    const url = 'https://www.themoviedb.org/reset-password';
    return Linking.openURL(url);
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
      style={styles.loginWrapper}
    >
      <View style={styles.loginContainer}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          onChange={() => setError('')}
          style={styles.input}
          onChangeText={setLogin}
          value={login}
          placeholder="Login"
          keyboardType="default"
          placeholderTextColor={THEME.LIGHT_TEXT}
        />
        <TextInput
          onChange={() => setError('')}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
          keyboardType="default"
          placeholderTextColor={THEME.LIGHT_TEXT}
        />
        <View style={styles.btn}>
          {isLoading ? (
            <ActivityIndicator size="large" color={THEME.BUTTON} />
          ) : (
            <Button
              disabled={login === '' || password === ''}
              title="Sign in"
              color={THEME.BUTTON}
              onPress={handleLogin}
            />
          )}
        </View>
        <View style={styles.helpTextContainer}>
          <Pressable onPress={handleOpenForgotPassPage}>
            <Text style={styles.helpText}>Forgot password</Text>
          </Pressable>
          <Pressable onPress={handleOpenRegisterPage}>
            <Text style={styles.helpText}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.DARK,
  },
  loginContainer: {
    width: 250,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#404040',
    color: THEME.LIGHT_TEXT,
  },
  btn: {
    padding: 12,
  },
  errorText: {
    color: THEME.BUTTON,
    textAlign: 'center',
  },
  helpTextContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  helpText: {
    marginBottom: 30,
    color: THEME.BLUE,
  },
});
