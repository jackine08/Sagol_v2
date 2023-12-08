import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getItem } from './storage';

function ImageItem({ navigation, path, name }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const storedDescription = await getItem(path);

        // Check if storedDescription is empty or not a valid JSON string
        const parsedDescription = storedDescription
          ? JSON.parse(storedDescription)["ko"]
          : "설명 없음";

        setDescription(parsedDescription);
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };

    fetchDescription();
  }, [name]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Page_imageDescription', { path, description, name })}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: path }} style={styles.image} accessibilityLabel={description} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
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
    borderRadius: 8,
  },
});

export default ImageItem;
