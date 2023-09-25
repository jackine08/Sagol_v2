import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowPicker from './component/image_picker'

const Stack = createNativeStackNavigator();
 

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="ShowPicker" component={ShowPicker}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 

const App = () => {


  return (
    <Navigation></Navigation>
  );
};


export default App;