import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (keys, value) => {
  try {
    await AsyncStorage.setItem(keys, value);
  } catch (error) {
    console.log('Error storing value', error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('Error retrieving value', error);
  }
};
