import { View, Text, Button } from 'react-native';
import { useAppNavigation } from '../types';

export const Three = () => {
  const navigation = useAppNavigation();
  return (
    <View>
      <Text>One</Text>
      <Button
        title="Jump to One"
        onPress={() => navigation.navigate('Details', { screen: 'One' })}
      />
    </View>
  );
};
