import React, { FC } from 'react';
import { usePagination } from '../hooks/usePagination';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { THEME } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Pagination: FC<PaginationType> = ({
  paginate,
  currentPage,
  totalCount,
  siblingCount,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const handleClickPage = (e: any, pageNumber: string | number) => {
    paginate(Number(pageNumber));
  };

  return (
    <View style={styles.paginationWrapper}>
      <Pressable onPress={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        <MaterialCommunityIcons
          name="skip-previous"
          size={30}
          color={currentPage === 1 ? THEME.GRAY : THEME.TEXT}
        />
      </Pressable>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === null) {
          return (
            <View key={`${pageNumber}${index}`} style={styles.dotsContainer}>
              <Text style={styles.dotsStyle}>{'...'}</Text>
            </View>
          );
        }

        return (
          <Pressable onPress={(e) => handleClickPage(e, pageNumber)} key={pageNumber}>
            <View
              style={[
                styles.pageButton,
                {
                  borderColor: pageNumber === currentPage ? THEME.BLUE : THEME.TEXT,
                  backgroundColor: pageNumber === currentPage ? THEME.BLUE : THEME.DARK,
                },
              ]}
            >
              <Text style={styles.pageNumberText}>{pageNumber}</Text>
            </View>
          </Pressable>
        );
      })}
      <Pressable onPress={() => paginate(currentPage + 1)} disabled={currentPage === totalCount}>
        <MaterialCommunityIcons
          name="skip-next"
          size={30}
          color={currentPage === Math.ceil(totalCount / 20) ? THEME.GRAY : THEME.TEXT}
        />
      </Pressable>
    </View>
  );
};

type PaginationType = {
  paginate: (pageNumber: number) => void;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount: number;
};

const styles = StyleSheet.create({
  paginationWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  dotsContainer: { justifyContent: 'flex-end' },
  dotsStyle: {
    color: THEME.TEXT,
    marginHorizontal: 5,
  },
  pageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: 30,
    height: 30,
    marginHorizontal: 4,
  },
  pageNumberText: {
    color: THEME.TEXT,
  },
});
