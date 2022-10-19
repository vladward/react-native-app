import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStore = {
  async setValue(key: string, value: string) {
    return await AsyncStorage.setItem(key, value);
  },
  async getValue(key: string) {
    return await AsyncStorage.getItem(key);
  },
  async deleteValue(key: string) {
    return await AsyncStorage.removeItem(key);
  },
};
