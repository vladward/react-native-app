import { MyWatchlistPropsType, useAppNavigation } from './types';
import { Button, Text, View } from 'react-native';

export const MyWatchlist = ({}: MyWatchlistPropsType) => {
  const navigation = useAppNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Jump to Settings"
        onPress={() =>
          navigation.navigate('Settings', { id: 1000, data: 'Hello new Settings screen' })
        }
      />
    </View>
  );
};
