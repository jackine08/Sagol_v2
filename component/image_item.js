import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getItem } from './storage';

function ImageItem({ navigation, path, name }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const storedDescription = await getItem("file://"+path);
        setDescription(storedDescription);
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };

    fetchDescription();
  }, [name]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Page_imageDescription', { path, description, name })}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: 'file://' + path }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8, // 여백을 줄여보자
    borderRadius: 10, // 둥근 테두리 추가
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8, // 이미지에도 둥근 테두리 추가
  },
});

export default ImageItem;
