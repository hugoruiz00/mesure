import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { FloatingActionButton } from './FloatingActionButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Pagination = ({data, index}) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      {index===2 && 
        <FloatingActionButton
            action={async ()=> {
              try {
                await AsyncStorage.setItem('introStatus', 'Shown');
              } catch (e) {}
              navigation.navigate('ShapeDataFrom');
            }}
            style={styles.floatingButton}
            child={
            <Text style={styles.textAdjust}>
                Comenzar
            </Text>                  
            }
        />
      }
      <View style={styles.dotsContainer}>
        {data.map((_, idx) => {
          return <View 
              key={idx.toString()} 
              style={[
                  styles.dot, 
                  idx === index && styles.dotActive,  
              ]}>
          </View>
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom:30,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    dotsContainer: {
      flexDirection: 'row'
    },
    dot: {
        width:12,
        height:12,
        borderRadius:6,
        marginHorizontal:3,
        backgroundColor:'#a0a0a0'
    },
    dotActive: {
        backgroundColor:'#7624ac'
    },
    floatingButton: {
        borderRadius: 5,
        height: 40,
        width: 250,
        marginBottom:10,
        backgroundColor: "#7624ac",
    },
    textAdjust: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:600,
        marginHorizontal:10,
    }
});

export default Pagination