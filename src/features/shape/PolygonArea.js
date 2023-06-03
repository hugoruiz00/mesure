import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { calculateDistance } from '../../utils/formulas';
import { useSelector } from 'react-redux';

export const PolygonArea = ({shape}) => {
  const scale = useSelector(state => state.scale);
  const coordinates = shape.map(({position})=> position);
  const distances = shape.map(({sideDistance})=> sideDistance);

  return (
    <View style={{ flex: 1 }}>
      <Svg width="100%" height="100%">
        <Polygon
          points={coordinates.map(({ x, y }) => `${x+10},${y+10}`).join(' ')}
          fill="#b965da96"
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