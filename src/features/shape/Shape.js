import React from 'react';
import Vertex from './Vertex';
import { useDispatch, useSelector } from 'react-redux';
import { LineConnector } from './LineConnector';
import { Svg } from 'react-native-svg';
import { Text } from 'react-native';
import { calculateArea, getAdjustedShapeDimensions } from '../../utils/formulas';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { shapeSetted } from './shapeSlice';

function Shape() {
  const shape = useSelector(state => state.shape);
  const scale = useSelector(state => state.scale);
  const dispatch = useDispatch();

  const renderedVertices = shape.map((vertex) => {
    return <Vertex key={vertex.id} id={vertex.id} position={vertex.position}></Vertex>
  });

  const renderedLines = shape.map((vertex, index) => {
    if(index>0){
      if (index==shape.length-1) {
        return <React.Fragment key={vertex.id+"fragment"}>
          <LineConnector start={shape[index-1].position} end={vertex.position} distance={shape[index-1].sideDistance}></LineConnector>
          <LineConnector start={vertex.position} end={shape[0].position} distance={vertex.sideDistance}></LineConnector>
        </React.Fragment>
      }
      return <LineConnector key={vertex.id+"line"} start={shape[index-1].position} end={vertex.position} distance={shape[index-1].sideDistance}></LineConnector>;
    }
  });

  return (
    <>
      <Text style={{
        position:'absolute',
        fontSize:20,
        color:'black',
        fontWeight:'bold'
      }}>{(calculateArea(shape) * scale**2).toFixed(5)}</Text>
      <Svg>
        {renderedLines}
      </Svg>
      {renderedVertices}
      <FloatingActionButton
        action={()=>{
          if (shape.length >= 3) {
            const shapeAdjusted = getAdjustedShapeDimensions(shape, scale);
            dispatch(shapeSetted(shapeAdjusted));
          }
        }}
      />
    </>
  );
}

export default Shape;