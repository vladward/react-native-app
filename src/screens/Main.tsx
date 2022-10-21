import { LoginStack, RootStack } from '../types/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Favorite } from './Favorite';
import { Settings } from './Settings';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../styles/theme';
import { CONSTANTS } from '../constants';
import { Platform } from 'react-native';
import { MainNested } from './nestedScreen';
import { useAppContext } from '../context/AppContext';
import { textTranslate } from '../utils/textTranslate';
import { useAuthContext } from '../context/AuthContext';
import { Login } from './Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchMoviesNested } from './nestedScreen';

const Tab = createBottomTabNavigator<RootStack>();

const Stack = createNativeStackNavigator<LoginStack>();

export const Main = () => {
  const { language } = useAppContext();
  const { isAuth } = useAuthContext();

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
  if (isAuth) {
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
      </Tab.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }
};

type RouteType = { name: 'NowPlaying' | 'Favorite' | 'Settings' | 'SearchMovies' };
