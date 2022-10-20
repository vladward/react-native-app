import { NestedFavoriteType } from '../types/types';
import { Text } from 'react-native';
import { THEME } from '../styles/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoriteList, SingleMovie } from './nestedScreen';

const Stack = createNativeStackNavigator<NestedFavoriteType>();

export const Favorite = () => {
  return (
    <Stack.Navigator initialRouteName={'FavoriteList'}>
      <Stack.Screen name="FavoriteList" component={FavoriteList} options={{ headerShown: false }} />
      <Stack.Screen
        name="FavoriteSingleMovie"
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
};
