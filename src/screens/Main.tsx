import { RootStack } from '../types/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyWatchlist } from './MyWatchlist';
import { Settings } from './Settings';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../styles/theme';
import { CONSTANTS } from '../constants';
import { Platform } from 'react-native';
import { MainNested } from './nestedScreen/MainNested';
import { useAppContext } from '../context/AppContext';
import { textTranslate } from '../utils/textTranslate';
import { useAuthContext } from '../context/AuthContext';
import { Login } from './Login';

const Tab = createBottomTabNavigator<RootStack>();

export const Main = () => {
  const { language } = useAppContext();
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Login />;
  }

  const handleGetTabIcon = (route: RouteType, focused: boolean) => {
    switch (route.name) {
      case 'MyWatchlist':
        return (
          <MaterialCommunityIcons
            name="playlist-play"
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
    }
  };
  const focusedColor = (focused: boolean) => (focused ? THEME.BLUE : THEME.TEXT);
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
        name="MyWatchlist"
        component={MyWatchlist}
        options={{ title: textTranslate(language, 'My Watchlist', 'Мой плейлист') }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: textTranslate(language, 'Settings', 'Настройки') }}
      />
    </Tab.Navigator>
  );
};

type RouteType = { name: 'NowPlaying' | 'MyWatchlist' | 'Settings' };
