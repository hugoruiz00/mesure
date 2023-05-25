/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {  SafeAreaView, StyleSheet,  View} from 'react-native';
import Shape from './src/features/shape/Shape';

function App() {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}} >
      <Shape></Shape>
    </SafeAreaView>
  );
}

export default App;
