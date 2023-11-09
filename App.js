import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Page_Main from './screen/main';
import Page_imageDescription from './screen/page_imageDescription';
import Page_results from './screen/page_results';

const Stack = createNativeStackNavigator();
 

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Page_Main" component={Page_Main}/>
      <Stack.Screen name="Page_imageDescription" component={Page_imageDescription}/>
      <Stack.Screen name="Page_results" component={Page_results}/>
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