import React from 'react';
import { Button, SafeAreaView, Text, View, Alert, Image } from 'react-native';

function Page_imageDescription({ route }) {
  const { path, description, name } = route.params;
  // console.log("in PAGE " + path);

  return (
    <SafeAreaView>
      <Image
        source={{ uri: path }}
        style={{ width: 200, height: 200 }} // 이미지 크기 설정 (선택 사항)
      />
      <View>
        <Text>사진 설명: {description}</Text>
        <Button
          title="설명 다시 요청하기"
          onPress={() => Alert.alert('잠시만 기다려주세용')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Page_imageDescription;
