import { NowPlayingPropsType, useAppNavigation } from '../types/types';
import { Button, Text, View } from 'react-native';
import { THEME } from '../styles/theme';

export const NowPlaying = ({}: NowPlayingPropsType) => {
  const navigation = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.DARK,
      }}
    >
      <Text>Home Screen</Text>
      <Button
        title="Jump to MyWatchlist"
        onPress={() => navigation.navigate('MyWatchlist', { screen: 'One' })}
      />
    </View>
  );
};
