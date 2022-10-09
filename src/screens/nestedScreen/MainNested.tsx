import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { One } from './One';
import { Two } from './Two';
import { Three } from './Three';
import { NestedMainType } from '../types';

const Stack = createNativeStackNavigator<NestedMainType>();

export const MainNested = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="One" component={One} />
      <Stack.Screen name="Two" component={Two} />
      <Stack.Screen name="Three" component={Three} />
    </Stack.Navigator>
  );
};
