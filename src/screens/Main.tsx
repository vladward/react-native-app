import { RootStack, RouteType } from '../types/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Favorite } from './Favorite';
import { Settings } from './Settings';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../styles/theme';
import { CONSTANTS } from '../constants';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import { MainNested, SearchMoviesNested } from './nestedScreen';
import { useAppContext } from '../context/AppContext';
import { textTranslate } from '../utils';
import { useAuthContext } from '../context/AuthContext';
import { Login } from './Login';

const Tab = createBottomTabNavigator<RootStack>();

export const Main = () => {
  const { language } = useAppContext();

  const { isAuth, isAppLoading } = useAuthContext();

  const handleGetTabIcon = (route: RouteType, focused: boolean) => {
    switch (route.name) {
      case 'Favorite':
        return (
          <MaterialIcons
            name="favorite-outline"
            size={CONSTANTS.ICON_SIZE}
            color={focusedColor(focused)}
          />
        );
      case 'NowPlaying':
        return (
          <MaterialCommunityIcons
            name="filmstrip-box"
            size={CONSTANTS.ICON_SIZE}
            color={focusedColor(focused)}
          />
        );
      case 'Settings':
        return (
          <Ionicons
            name="md-settings-outline"
            size={CONSTANTS.ICON_SIZE}
            color={focusedColor(focused)}
          />
        );
      case 'SearchMovies':
        return (
          <MaterialIcons name="search" size={CONSTANTS.ICON_SIZE} color={focusedColor(focused)} />
        );
    }
  };

  const focusedColor = (focused: boolean) => (focused ? THEME.BLUE : THEME.TEXT);

  if (isAppLoading) {
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => handleGetTabIcon(route, focused),
        tabBarActiveTintColor: THEME.BLUE,
        tabBarInactiveTintColor: THEME.TEXT,
        tabBarInactiveBackgroundColor: THEME.LIGHT_DARK,
        tabBarStyle: {
          backgroundColor: THEME.LIGHT_DARK,
          height: 80,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: CONSTANTS.TEXT12,
        },
        headerStyle: { backgroundColor: THEME.LIGHT_DARK },
        title: 'Now Playing',
        headerTintColor: THEME.TEXT,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        tabBarHideOnKeyboard: true,
      })}
      initialRouteName="NowPlaying"
      sceneContainerStyle={{ backgroundColor: THEME.DARK }}
    >
      {isAuth ? (
        <Tab.Group>
          <Tab.Screen
            name="NowPlaying"
            component={MainNested}
            options={{ title: textTranslate(language, 'Now Playing', 'В прокате') }}
          />
          <Tab.Screen
            name="Favorite"
            component={Favorite}
            options={{ title: textTranslate(language, 'Favorite', 'Избранное') }}
          />
          <Tab.Screen
            name="SearchMovies"
            component={SearchMoviesNested}
            options={{ title: textTranslate(language, 'Search', 'Поиск') }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{ title: textTranslate(language, 'Settings', 'Настройки') }}
          />
        </Tab.Group>
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarStyle: {
              display: 'none',
            },
            headerShown: false,
          }}
        />
      )}
    </Tab.Navigator>
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
  notFoundText: {
    color: THEME.TEXT,
    marginBottom: 10,
    fontSize: CONSTANTS.TEXT16,
  },
});
