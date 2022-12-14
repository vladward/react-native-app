import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NowPlayingMovies } from './NowPlayingMovies';
import { SingleMovie } from './SingleMovie';
import { NestedMainType } from '../../types/types';
import { THEME } from '../../styles/theme';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator<NestedMainType>();

export const MainNested = () => (
  <Stack.Navigator initialRouteName={'NowPlayingMovies'}>
    <Stack.Screen
      name="NowPlayingMovies"
      component={NowPlayingMovies}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SingleMovie"
      component={SingleMovie}
      options={({ route }) => ({
        title: route?.params?.name,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: THEME.LIGHT_DARK },
        headerTintColor: THEME.TEXT,
        headerTitle: () => (
          <Text style={{ width: 300, color: THEME.TEXT }}>{route.params.name}</Text>
        ),
      })}
    />
  </Stack.Navigator>
);
