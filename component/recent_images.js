import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import get_picture_data from "./GalleryPicker";
import { getItem } from './storage';

function Item({ navigation, path, name }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const storedDescription = await getItem(name);
        setDescription(storedDescription);
        console.log(name);
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };

    fetchDescription();
  }, [name]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Page_imageDescription', { path, description })}>
      <View
        style={{
          backgroundColor: '#f9c2ff',
          padding: 10,
          marginVertical: 8,
          marginHorizontal: 30,
        }}>
        <Image source={{ uri: 'file://' + path }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

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
      <>
        <View>
          <FlatList
            data={localData}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <Item path={item.path} name={item.name} navigation={navigation} />}
          />
        </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});

export default Recent_images_grid_view;
