import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import get_picture_data from "./GalleryPicker";
import { getItem } from './storage';
import ImageItem from './image_item';

const Recent_images_grid_view = ({ navigation }) => {
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_picture_data();
        setLocalData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 0 }}>
      <FlatList
        data={localData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ImageItem path={"file://"+item.path} name={item.name} navigation={navigation} />}
        numColumns={2} // 여기에 numColumns 속성을 추가해 두 개의 열로 표시할 수 있도록 설정
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    justifyContent: 'space-between', // 각 열을 여백으로 나눔
    paddingHorizontal: 16, // 가장자리 여백
  },
});

export default Recent_images_grid_view;
