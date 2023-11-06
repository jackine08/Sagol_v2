import {React, useState, useEffect} from 'react';
import {Text, View, SafeAreaView, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import get_picture_data from "./GalleryPicker"

function Item({navigation, path, description, name}) {
    return(
    <TouchableOpacity onPress={() => navigation.navigate('Page_imageDescription', {path: path, description: description})}>
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
    )
};

async function fetchData() {
    const temp = await get_picture_data();
    console.log(temp);

    return temp;
}
  
const Recent_images_grid_view = ({ navigation }) => {
  const [localData, setLocalData] = useState([]); // 상태 변수 추가

  useEffect(() => {
    fetchData().then((data) => {
      setLocalData(data); // 데이터를 상태 변수에 설정
    });
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <SafeAreaView style={{ marginTop: 0 }}>
      <>
        <View>
          <FlatList
            data={localData} // 상태 변수 사용
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <Item path={item.path} description={item.description} navigation={navigation} name={item.name} />}
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