import React from 'react';
import {Text, View, SafeAreaView, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Get_description from '../axios/get_description';
import DATA from '../ex/DATA_EX';

function Item({navigation, title, description}) {

    return(
    <TouchableOpacity onPress={() => navigation.navigate('Page_imageDescription', {path: title, description: description})}>
    <View
        style={{
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 30,
        }}>
        <Image source={title} style={styles.image} />
    </View>
    </TouchableOpacity>
    )
};

const Recent_images_grid_view = ({navigation}) => {
    
    // const DATA = Get_description();
    
    return (
        <SafeAreaView style={{marginTop: 0}}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
        
        <View style={{paddingHorizontal: 3}}>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item title={item.title} description={item.Description} navigation={navigation} />}
                numColumns={2}
            />
        </View>

        </ScrollView>
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