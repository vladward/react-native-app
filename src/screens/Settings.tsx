import { useAppNavigation, SettingsPropsType } from './types';
import { Button, Text, View } from 'react-native';

export const Settings = ({ route }: SettingsPropsType) => {
  const navigation = useAppNavigation();
  const params = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Users Screen</Text>
      {params ? <Text>'id': {params.id} </Text> : <Text> Params id is undefined </Text>}
      {params ? <Text>data: {params.data}</Text> : <Text> Params data is undefined </Text>}
      <Button title="Jump to NowPlaying" onPress={() => navigation.navigate('NowPlaying')} />
    </View>
  );
};
