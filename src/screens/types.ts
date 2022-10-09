import { NavigationProp, NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NestedMainType = {
  One: undefined;
  Two: undefined;
  Three: undefined;
};

export type RootStack = {
  NowPlaying: undefined;
  MyWatchlist: NavigatorScreenParams<NestedMainType>;
  Settings:
    | {
        id: number | string;
        data: string;
      }
    | undefined;
};

export type NowPlayingPropsType = NativeStackScreenProps<RootStack, 'NowPlaying'>;
export type MyWatchlistPropsType = NativeStackScreenProps<RootStack, 'MyWatchlist'>;
export type SettingsPropsType = NativeStackScreenProps<RootStack, 'Settings'>;

export type NavigationUseType = NavigationProp<RootStack>;

export const useAppNavigation = () => useNavigation<NavigationUseType>();
