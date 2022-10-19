import { MyWatchlistPropsType } from '../types/types';
import { Text, View } from 'react-native';
import { THEME } from '../styles/theme';

export const Favorite = ({}: MyWatchlistPropsType) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.DARK,
      }}
    >
      <Text>My watchlist</Text>
    </View>
  );
};
