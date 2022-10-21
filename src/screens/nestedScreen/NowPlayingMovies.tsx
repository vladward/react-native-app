import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { NowPlayingResultsType, NowPlayingType, useAppNavigation } from '../../types/types';
import { useEffect, useState } from 'react';
import { Card, Pagination } from '../../components';
import { THEME } from '../../styles/theme';
import { API } from '../../api';
import { CONSTANTS } from '../../constants';
import { useAppContext } from '../../context/AppContext';
import { textTranslate } from '../../utils/textTranslate';

export const NowPlayingMovies = () => {
  const [nowPlayingData, setNowPlayingData] = useState<NowPlayingType>();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigation = useAppNavigation();

  const { language, setParentPage } = useAppContext();

  useEffect(() => {
    API.getNowPlaying(currentPage, language).then((data) => setNowPlayingData(data));
  }, [currentPage, language]);

  const render: ListRenderItem<NowPlayingResultsType> = ({ item }) => {
    return (
      <Card
        cardData={item}
        onPress={() => {
          setParentPage('NowPlaying');
          navigation.navigate('NowPlaying', {
            screen: 'SingleMovie',
            params: { id: item.id, name: item.title },
          });
        }}
      />
    );
  };

  if (!nowPlayingData?.results) {
    return (
      <View style={styles.nowPlayingContainerLoader}>
        <Text style={styles.notFoundText}>
          {textTranslate(language, 'Loading ...', 'Загрузка ...')}
        </Text>
        <Text>
          <ActivityIndicator size="large" color={THEME.BLUE} />;
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <View>
        {!nowPlayingData.results.length ? (
          <Text style={styles.notFoundText}>
            {textTranslate(language, 'Movies not found', 'Фильмы не найдены')}
          </Text>
        ) : null}
        <FlatList<NowPlayingResultsType>
          horizontal={false}
          data={nowPlayingData.results}
          renderItem={render}
          keyExtractor={(item, index) => {
            return item.id.toString() + index.toString();
          }}
          numColumns={2}
          ListFooterComponent={
            <Pagination
              paginate={setCurrentPage}
              currentPage={currentPage as number}
              totalCount={nowPlayingData.total_results as number}
              pageSize={20}
              siblingCount={2}
            />
          }
          ListFooterComponentStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nowPlayingContainerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: THEME.DARK,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: THEME.DARK,
    justifyContent: 'center',
    borderWidth: 0,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
  notFoundText: {
    color: THEME.TEXT,
    marginBottom: 10,
    fontSize: CONSTANTS.TEXT16,
  },
});
