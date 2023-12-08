import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ShowPicker from '../component/image_picker'
import Recent_images_grid_view from '../component/recent_images'
import Search_best_images from '../component/search_best_images';

function Page_Main({ navigation }) {
  return (
    <SafeAreaView >
      <StatusBar/>
      <Search_best_images navigation={navigation}></Search_best_images>
      <ShowPicker></ShowPicker>
      <Recent_images_grid_view navigation={navigation}></Recent_images_grid_view>
    </SafeAreaView>
  );
}

export default Page_Main;