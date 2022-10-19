import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from './src/screens';
import { AppProvider } from './src/context/AppContext';
import { Text } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <NavigationContainer fallback={<Text>Loading...</Text>}>
          <StatusBar style="light" />
          <Main />
        </NavigationContainer>
      </AppProvider>
    </AuthProvider>
  );
}
