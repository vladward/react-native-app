import { View, Text, Button } from 'react-native';
import { useAppNavigation } from '../../types/types';

export const One = () => {
  const navigation = useAppNavigation();
  return (
    <View>
      <Text>One</Text>
      <Button
        title="Jump to Two"
        onPress={() => navigation.navigate('Details', { screen: 'Two' })}
      />
    </View>
  );
};
