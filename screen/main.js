import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ShowPicker from '../component/image_picker'
import Voice_input from '../component/voice_input'
import Voice_recognition from '../component/voice_recognition'
import Recent_images_grid_view from '../component/recent_images'
import Button_search from '../component/search';

function Page_Main({ navigation }) {

  return (
    <SafeAreaView >
      <StatusBar/>
      <Voice_input></Voice_input>
      {/* <Voice_recognition></Voice_recognition>  */}
      <Button_search></Button_search>
      <ShowPicker></ShowPicker>
      <Recent_images_grid_view navigation={navigation}></Recent_images_grid_view>

    </SafeAreaView>
  );
}

export default Page_Main;
