import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { setItem, getItem } from './storage';

function StartLibrary() {
  //launchImageLibrary : 사용자 앨범 접근
  launchImageLibrary({}, async (res) => {
    const formdata = new FormData()
    const file = {
      name: res?.assets?.[0]?.fileName,
      type: res?.assets?.[0]?.type,
      uri: res?.assets?.[0]?.uri,
    };
    console.log(res);

    formdata.append('Image', file);
    formdata.append('Hash', file.name);
    formdata.append('Id', file.name);
    
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    // console.log(formdata);
    const bf_res = await axios.post("http://minigpt4.hcailab.uos.ac.kr/getAltText", formdata, {headers: headers}).then((res) => {
      console.log("receive data from AI" + res["data"][0]["Id"]);
      // console.log(res["data"][0]["Description"]);
      setItem(file.name, res["data"][0]["Description"]);
      // const storage_result = getItem(file.name);
      // console.log("storage 확인" + storage_result);
      }
    );
    console.log("data sent");
  })
};

const ShowPicker = () => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={()=>{StartLibrary()}}>
        <Text>사진 업로드</Text>
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