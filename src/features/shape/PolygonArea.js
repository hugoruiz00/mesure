import React, { useRef } from 'react';
import { PanResponder, Text, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { calculateDistance } from '../../utils/formulas';
import { useDispatch } from 'react-redux';
import { shapeSetted } from './shapeSlice';

export const PolygonArea = ({shape, scale}) => {
  const dispatch = useDispatch();
  const coordinates = shape.map(({position})=> position);
  const distances = shape.map(({sideDistance})=> sideDistance);
  
  const shapeRef = useRef(shape);
  shapeRef.current = shape;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gesture) => {
          const shapeAux = [...shapeRef.current];
          for (let index = 0; index < shapeAux.length; index++) {
            shapeAux[index].position = {x:shapeAux[index].position.x+gesture.dx, y:shapeAux[index].position.y+gesture.dy};
          }
          dispatch(shapeSetted(shapeAux));          
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      <Svg width="100%" height="100%">
        <Polygon
          points={coordinates.map(({ x, y }) => `${x+10},${y+10}`).join(' ')}
          fill="#b965da96"
          {...panResponder.panHandlers}
        />
        {coordinates.map((start, index) => {
          const nextIndex = (index + 1) % coordinates.length;
          const end = coordinates[nextIndex];

          return (
            <React.Fragment key={index}>
              <Text style={{
                  position: 'absolute',
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'black',
                  left: (start.x + end.x) / 2,
                  top: (start.y + end.y) / 2,
                }}>
                {(calculateDistance(start.x, start.y, end.x, end.y) * scale).toFixed(2)}
              </Text>
              <Text style={{
                  position: 'absolute',
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'black',
                  left: (start.x + end.x) / 2,
                  top: (start.y + end.y) / 2+20,
                }}>
                {distances[index]}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};