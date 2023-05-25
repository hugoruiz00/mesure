import React from 'react';
import Vertex from './Vertex';
import { useSelector } from 'react-redux';
import { LineConnector } from './LineConnector';
import { Svg } from 'react-native-svg';
import { Text } from 'react-native';

function Shape() {
  const shape = useSelector(state => state.shape);

  const calculateArea = (shape) => {
    let total = 0;
    console.log(shape);
    shape.forEach((vertex, index) => {
      const nextIndex = (index==shape.length-1) ? 0: index+1;
      total+= vertex.position.x * shape[nextIndex].position.y;
      total-= vertex.position.y * shape[nextIndex].position.x;
    }); 

    return Math.abs(total/2);
  }

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