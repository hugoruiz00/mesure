/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ShapeDataForm from './src/features/shape/ShapeDataForm';
import Shape from './src/features/shape/Shape';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ShapeDataFrom"
          component={ShapeDataForm}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Shape"
          component={Shape}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
