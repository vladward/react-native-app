import { NowPlayingPropsType } from '../types/types';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { THEME } from '../styles/theme';
import { Card } from '../components';

export const NowPlaying = ({}: NowPlayingPropsType) => {
  // const navigation = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.DARK,
        borderWidth: 0,
      }}
    >
      {/*<Button*/}
      {/*  title="Jump to MyWatchlist"*/}
      {/*  onPress={() => navigation.navigate('MyWatchlist', { screen: 'One' })}*/}
      {/*/>*/}
      <View style={styles.listContainer}>
        <ScrollView>
          <View>
            <FlatList<ListItemType>
              data={new Array(30).fill('new')}
              renderItem={(item) => <Card cardData={item} />}
              keyExtractor={(item, index) => item + index.toString()}
              numColumns={2}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
});

type ListItemType = {};
