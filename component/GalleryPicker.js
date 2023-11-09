import RNFS, { PicturesDirectoryPath } from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';

async function get_picture_data() {
  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

  var for_save = [];

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    const downloadsFolderPath = RNFS.DownloadDirectoryPath;

    try {
      const files_downloads = await RNFS.readDir(downloadsFolderPath);
      const files_pictures = await RNFS.readDir(PicturesDirectoryPath);
      const imageFiles_d = files_downloads.filter(file => file.isFile() && file.name.match(/\.(jpg|jpeg|png|gif)$/i));
      const imageFiles_p = files_pictures.filter(file => file.isFile() && file.name.match(/\.(jpg|jpeg|png|gif)$/i));

      // console.log(imageFiles);

      // parsing image metadata
      imageFiles_d.forEach(file => {
        for_save.push({
          "path": file.path,
          "name": file.name
        });
      });
      
      imageFiles_p.forEach(file => {
        for_save.push({
          "path": file.path,
          "description": "many many descriptions",
          "name": file.name
        });
      });

      return for_save;
    } catch (error) {
      console.error('Error reading Downloads folder:', error);
      return for_save; // 에러 발생 시 빈 배열을 반환
    }
  } else {
    console.log('Permission denied to access external storage');
    return for_save; // 권한이 거부된 경우 빈 배열을 반환
  }
}

export default get_picture_data;