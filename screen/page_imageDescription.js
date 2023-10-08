import React from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  Alert
} from 'react-native';


import { Image } from 'react-native';



function Page_imageDescription({ route }) {
  const {path, description} = route.params;
  
  return (
    <SafeAreaView>
      <Text>사진 설명</Text>
      <Image source={path}/>
      <Text>{description}</Text>
      <View>
            <Button
                title="다시 듣기"
                onPress={(()=>Alert.alert('재생중'))}
            >
            </Button>
        </View>
    </SafeAreaView>
  );
}


export default Page_imageDescription;
