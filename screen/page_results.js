import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet, Image } from 'react-native';
import get_picture_data from "../component/GalleryPicker";
import { getItem } from './storage';
import ImageItem from '../component/image_item';

function Page_Results ({ route }) {
  const Data = route.params.results;
  // console.log(Data);
  return (
    <SafeAreaView style={{ marginTop: 0 }}>
      <FlatList
        data={Data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Image source={{ uri: item}} style={styles.image}/>}
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 8, // 이미지에도 둥근 테두리 추가
  },
});

export default Page_Results;
