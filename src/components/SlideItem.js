import { View, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

const SlideItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Image 
        source={item.img}
        resizeMode='stretch'
        style={styles.img}
        accessibilityLabel={item.label}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems:'center',
  },
  img: {
    flex:0.9,
    width:'100%'
  },
});

export default SlideItem;