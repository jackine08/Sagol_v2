import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { setItem } from './storage';
import get_picture_data from './GalleryPicker';
import ImageResizer from 'react-native-image-resizer';

async function requestStoragePermission() {
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
      startImageUpload(); // 권한이 허용되면 이미지 업로드 함수 실행
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
async function startImageUpload() {
  try {
    const files = await get_picture_data();

    const uploadPromises = files.map(async (file) => {
      // Resize image before uploading
      const resizedImage = await resizeImage(file.path, file.name);

      const formdata = new FormData();
      const fileData = await RNFS.readFile(resizedImage.path, 'base64');
      // console.log(resizedImage);

      formdata.append('Image', {
        name: file.name,
        type: 'image/jpeg',
        uri: "file://"+resizedImage.path,
      });
      formdata.append('Hash', file.name);
      formdata.append('Id', file.name);

      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const bf_res = await axios.post("http://minigpt4.hcailab.uos.ac.kr/getAltText", formdata, {headers});
      console.log(bf_res.data);
      console.log(`Received data from AI for ${file.name}`);
      setItem("file://"+file.path, bf_res.data[0].Description);

      // Remove resized image after upload
      RNFS.unlink(resizedImage.path)
        .then(() => console.log('Resized image removed'))
        .catch((err) => console.error('Error removing resized image:', err));
    });

    await Promise.all(uploadPromises);
    console.log('All images uploaded');
  } catch (error) {
    console.error('Error uploading images:', error);
  }
}

async function resizeImage(originalPath, fileName) {
  const resizedPath = RNFS.TemporaryDirectoryPath + `/${fileName}`;
  await ImageResizer.createResizedImage(originalPath, 800, 600, 'JPEG', 80)
    .then(({ uri }) => {
      RNFS.moveFile(uri, resizedPath)
        .then(() => console.log('Image resized'))
        .catch((err) => console.error('Error moving resized image:', err));
    })
    .catch((err) => console.error('Error resizing image:', err));

  return { path: resizedPath, name: fileName };
}


const ShowPicker = () => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={requestStoragePermission}>
        <Text>사진 일괄 업로드</Text>
      </TouchableOpacity>
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
