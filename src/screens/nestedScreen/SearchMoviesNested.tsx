import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SingleMovie } from './SingleMovie';
import { NestedAllMoviesType } from '../../types/types';
import { THEME } from '../../styles/theme';
import { Text } from 'react-native';
import { SearchMovies } from './SearchMovies';

const Stack = createNativeStackNavigator<NestedAllMoviesType>();

export const SearchMoviesNested = () => (
  <Stack.Navigator initialRouteName={'SearchMoviesList'}>
    <Stack.Screen
      name="SearchMoviesList"
      component={SearchMovies}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AllSingleMovie"
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
