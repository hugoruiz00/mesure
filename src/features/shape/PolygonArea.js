import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { calculateDistance } from '../../utils/formulas';
import { useDispatch } from 'react-redux';
import { shapeSetted } from './shapeSlice';
import { Polygon } from './Polygon';

export const PolygonArea = ({shape, scale, distanceInShape}) => {
  const dispatch = useDispatch();
  const coordinates = shape.map(({position})=> position);
  const distances = shape.map(({sideDistance})=> sideDistance);

  return (
    <View style={{ flex: 1 }}>
        <Polygon
          shape={shape}
          coordinates={coordinates}
          dispatch={dispatch}
          shapeSetted={shapeSetted}
        />
        
        {coordinates.map((start, index) => {
          const nextIndex = (index + 1) % coordinates.length;
          const end = coordinates[nextIndex];

          return (
            distanceInShape ? 
            <React.Fragment key={index}>
              <Text style={{
                  position: 'absolute',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#575757',
                  left: (start.x + end.x) / 2,
                  top: (start.y + end.y) / 2,
                }}>
                {(calculateDistance(start.x, start.y, end.x, end.y) * scale).toFixed(2)}
              </Text>
              <Text style={{
                  position: 'absolute',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#272727',
                  left: (start.x + end.x) / 2,
                  top: (start.y + end.y) / 2+20,
                }}>
                {distances[index]}
              </Text>
            </React.Fragment> 
            :
            <Text
              key={index}
              style={{
              position: 'absolute',
              fontSize: 20,
              fontWeight: 700,
              color: '#575757',
              left: (start.x + end.x) / 2,
              top: (start.y + end.y) / 2,
            }}>
              L{index+1}
            </Text>
          );
        })}
    </View>
  );
};