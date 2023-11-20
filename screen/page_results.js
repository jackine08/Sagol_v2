import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import ImageItem from '../component/image_item';
import { useNavigation } from '@react-navigation/native';

function Page_Results({ route }) {
  const Data = route.params.results;
  const navigation = useNavigation(); // useNavigation 훅 사용

  return (
    <SafeAreaView style={{ marginTop: 0 }}>
      <FlatList
        data={Data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <ImageItem path={item} name={item} navigation={navigation} />}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default Page_Results;
