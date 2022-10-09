import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from './src/screens';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Main />
    </NavigationContainer>
  );
}
