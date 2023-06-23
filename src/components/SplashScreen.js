import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
        <Image
          source={require('../assets/img/logo.png')}
          resizeMode='contain'
          style={styles.logo}
        />
        <Text style={styles.appName}>
            Measurea
        </Text>
    </View>
  )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f7edfa'
    },
    logo:{
        borderRadius:20,
        marginBottom:15
    },
    appName: {
        fontSize:26,
        fontWeight:'bold',
        letterSpacing:2,
        color:'#7624ac'
    }
});