import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    
    // 저장값 확인을 위한 console.log
    console.log(`setItem... ${key} : ${value}`);
  } catch (e) {
    throw e;
  }
};

export const getItem = async (key) => {
  try {
    const res = await AsyncStorage.getItem(key);
    return res || '';
  } catch (e) {
    throw e;
  }
};

export const getAllItems = async () => {
  try {
    // 모든 키를 가져온다
    const keys = await AsyncStorage.getAllKeys();

    // 키에 해당하는 값들을 가져온다
    const items = await AsyncStorage.multiGet(keys);

    return items;
  } catch (error) {
    throw error;
  }
};
