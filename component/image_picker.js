import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { getItem, setItem } from './storage';
import get_picture_data from './GalleryPicker';
import ImageResizer from 'react-native-image-resizer';

const ShowPicker = () => {
  const [existingItemsRatio, setExistingItemsRatio] = useState('');

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to upload images.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        startImageUpload(); // Grant permission, start image upload
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startImageUpload = async () => {
    try {
      const files = await get_picture_data();
  
      const uploadPromises = [];
      let existingItems = 0;
  
      for (let i = 0; i < files.length; i += 8) {
        const chunk = files.slice(i, i + 8); // 이미지를 8장씩 묶음
  
        const chunkUploadPromises = chunk.map(async (file) => {
          // 이하 이전 코드와 동일
          const itemExists = await getItem("file://" + file.path);
          if (itemExists) {
            existingItems += 1;
            console.log(`Item for ${file.path} already exists in AsyncStorage.`);
            return; // Skip uploading if the item already exists
          }
  
          const resizedImage = await resizeImage(file.path, file.name);
  
          const formdata = new FormData();
          const fileData = await RNFS.readFile(resizedImage.path, 'base64');
          formdata.append('Image', {
            name: file.name,
            type: 'image/jpeg',
            uri: "file://" + resizedImage.path,
          });
          formdata.append('Hash', file.name);
          formdata.append('Id', file.name);
  
          const headers = {
            'Content-Type': 'multipart/form-data',
          };
  
          const bf_res = await axios.post("http://minigpt4.hcailab.uos.ac.kr/getAltText", formdata, { headers });
          console.log(bf_res.data);
          console.log(`Received data from AI for ${file.name}`);
          setItem("file://" + file.path, bf_res.data[0].Description);
  
          RNFS.unlink(resizedImage.path)
            .then(() => console.log('Resized image removed'))
            .catch((err) => console.error('Error removing resized image:', err));
  
          uploadPromises.push(bf_res.data);
        });
  
        await Promise.all(chunkUploadPromises);
      }
  
      const ratio = `${existingItems}/${files.length}`;
      setExistingItemsRatio(ratio);
      console.log(`Existing Items Ratio: ${ratio}`);
  
      await Promise.all(uploadPromises);
      console.log('All images uploaded');
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const resizeImage = async (originalPath, fileName) => {
    const resizedPath = RNFS.TemporaryDirectoryPath + `/${fileName}`;
    await ImageResizer.createResizedImage(originalPath, 800, 600, 'JPEG', 80)
      .then(({ uri }) => {
        RNFS.moveFile(uri, resizedPath)
          .then(() => console.log('Image resized'))
          .catch((err) => console.error('Error moving resized image:', err));
      })
      .catch((err) => console.error('Error resizing image:', err));

    return { path: resizedPath, name: fileName };
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={requestStoragePermission}>
        <Text>Upload Pictures</Text>
      </TouchableOpacity>
      <View style={styles.countContainer}>
        <Text>Existing Items Ratio: {existingItemsRatio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default ShowPicker;
