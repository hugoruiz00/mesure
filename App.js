/**
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ShapeDataForm from './src/features/shape/ShapeDataForm';
import Shape from './src/features/shape/Shape';
import { Slider } from './src/features/intro/Slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkIntroStatus(){
      try {
        const introStatus = await AsyncStorage.getItem('introStatus');
        if(introStatus==='Shown'){
          setShowIntro(false);
        }else{
          setShowIntro(true);
        }
        setIsLoading(false);
      } catch (e) {}
    }
    checkIntroStatus();
  });

  if (isLoading) {
    return <ActivityIndicator size='large' style={{flex:1, alignItems:'center'}}/>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showIntro && <Stack.Screen
          name="Intro"
          component={Slider}
          options={{headerShown:false}}
        />}
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
