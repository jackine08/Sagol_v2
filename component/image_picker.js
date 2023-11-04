import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { setItem, getItem } from './storage';

function StartLibrary() {
  //launchImageLibrary : 사용자 앨범 접근
  launchImageLibrary({}, async (res) => {
    const formdata = new FormData()
    console.log(getItem("example"));
    const file = {
      name: res?.assets?.[0]?.fileName,
      type: res?.assets?.[0]?.type,
      uri: res?.assets?.[0]?.uri,
    };
    console.log(file);
    formdata.append('filename', file);
    formdata.append('hash', file.name);
    
    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    console.log(formdata);
    res = await axios.post("http://bf.hcailab.uos.ac.kr/images/test", formdata, {headers: headers})
    console.log("data sent");
    // console.log(res["data"]["description"]);
    setItem(file.name, res["data"]["description"]);
    const qwe = await getItem(file.name);
    console.log("storage 확인" + qwe);
  })
}

const ShowPicker = () => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={()=>{StartLibrary()}}>
        <Text>Press Here</Text>
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