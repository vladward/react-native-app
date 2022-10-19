import { NavigationProp, NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NestedMainType = {
  One: undefined;
  Two: { id: string | number; name: string } | undefined;
};

export type RootStack = {
  NowPlaying: NavigatorScreenParams<NestedMainType>;
  MyWatchlist: undefined;
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
export type TwoPropsType = NativeStackScreenProps<NestedMainType, 'Two'>;

export type NavigationUseType = NavigationProp<RootStack>;

export const useAppNavigation = () => useNavigation<NavigationUseType>();

export type MovieType = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | {
    id: number;
    backdrop_path: string;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    original_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type NowPlayingResultsType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: string | number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string | number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type NowPlayingType = {
  page: number;
  total_pages: number;
  total_results: number;
  dates: {
    maximum: string;
    minimum: string;
  };
  results: Array<NowPlayingResultsType>;
};
