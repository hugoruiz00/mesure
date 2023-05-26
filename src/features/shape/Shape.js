import React from 'react';
import Vertex from './Vertex';
import { useDispatch, useSelector } from 'react-redux';
import { LineConnector } from './LineConnector';
import { Svg } from 'react-native-svg';
import { Text } from 'react-native';
import { calculateArea, getXCoordinate, getYCoordinate } from '../../utils/formulas';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { vertexUpdated } from './shapeSlice';

function Shape() {
  const shape = useSelector(state => state.shape);
  const dispatch = useDispatch();

  const renderedVertices = shape.map((vertex) => {
    return <Vertex key={vertex.id} id={vertex.id} position={vertex.position}></Vertex>
  });

  const renderedLines = shape.map((vertex, index) => {
    if(index>0){
      if (index==shape.length-1) {
        return <React.Fragment key={vertex.id+"fragment"}>
          <LineConnector start={shape[index-1].position} end={vertex.position}></LineConnector>
          <LineConnector start={vertex.position} end={shape[0].position}></LineConnector>
        </React.Fragment>
      }
      return <LineConnector key={vertex.id+"line"} start={shape[index-1].position} end={vertex.position}></LineConnector>;
    }
  });

  return (
    <>
      <Text style={{
        position:'absolute',
        fontSize:20,
        color:'black',
        fontWeight:'bold'
      }}>{calculateArea(shape)}</Text>
      <Svg>
        {renderedLines}
      </Svg>
      {renderedVertices}
    </>
  );
}

export default Shape;