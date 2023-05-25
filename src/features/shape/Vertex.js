import React, { useRef } from 'react';
import { View, PanResponder, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { vertexUpdated } from './shapeSlice';

const Vertex = ({id, position}) => {
    const dispatch = useDispatch();

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
            dispatch(vertexUpdated({
              id,
              position: {
                x: gesture.moveX,
                y: gesture.moveY,
              }
            }));
        },
      })
    ).current;
  
    return (
      <View
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          backgroundColor:'#0962d6',
          width:30,
          height:30,
          borderRadius:100
        }}
        {...panResponder.panHandlers}
      >
      <Text style={{
        fontSize:20,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',

      }}>{id}</Text>
      </View>
    );
};

export default Vertex;