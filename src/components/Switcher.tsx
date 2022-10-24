import React, { FC } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { textTranslate } from '../utils';
import { THEME } from '../styles/theme';
import { CONSTANTS } from '../constants';

export type SwitcherType = {
  value: 'ru' | 'eng';
  onChange: (value: 'ru' | 'eng') => void;
  text1?: string;
  text2?: string;
  language: string;
};

export const Switcher: FC<SwitcherType> = ({ value, onChange, text1, text2, language }) => {
  return (
    <View style={styles.switcher}>
      <Text style={styles.title}>{textTranslate(language, 'Language', 'Язык')}</Text>
      <View style={styles.switcherContainer}>
        <Pressable onPress={() => onChange('ru')}>
          <View
            style={[
              styles.textContainer1,
              { backgroundColor: value === 'ru' ? THEME.BLUE : THEME.LIGHT_DARK },
            ]}
          >
            <Text style={styles.switcherText}>{text1}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => onChange('eng')}>
          <View
            style={[
              styles.textContainer2,
              { backgroundColor: value === 'eng' ? THEME.BLUE : THEME.LIGHT_DARK },
            ]}
          >
            <Text style={styles.switcherText}>{text2}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: THEME.TEXT,
    marginBottom: 10,
  },
  switcher: {
    marginVertical: 20,
    alignItems: 'center',
  },
  switcherContainer: {
    flexDirection: 'row',
  },
  textContainer1: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomStartRadius: 25,
    borderTopStartRadius: 25,
    borderWidth: 1,
    borderColor: THEME.TEXT,
  },
  textContainer2: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
    borderWidth: 1,
    borderColor: THEME.TEXT,
  },
  switcherText: {
    fontSize: CONSTANTS.TEXT16,
    color: THEME.TEXT,
  },
});
