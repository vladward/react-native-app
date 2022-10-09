import { View, Text, Button } from 'react-native';
import { useAppNavigation } from '../../types/types';

export const Two = () => {
  const navigation = useAppNavigation();
  return (
    <View>
      <Text>One</Text>
      <Button
        title="Jump to Three"
        onPress={() => navigation.navigate('Details', { screen: 'Three' })}
      />
    </View>
  );
};
