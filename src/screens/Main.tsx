import { RootStack } from './types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NowPlaying } from './NowPlaying';
import { MyWatchlist } from './MyWatchlist';
import { Settings } from './Settings';

const Tab = createBottomTabNavigator<RootStack>();

export const Main = () => {
  return (
    <Tab.Navigator initialRouteName="NowPlaying">
      <Tab.Screen name="NowPlaying" options={{ title: 'Now playing' }}>
        {(props) => <NowPlaying {...props} />}
      </Tab.Screen>
      <Tab.Screen name="MyWatchlist" component={MyWatchlist} options={{ title: 'My watchlist' }} />
      <Tab.Screen name="Settings" options={{ title: 'Settings' }}>
        {(props) => <Settings {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
