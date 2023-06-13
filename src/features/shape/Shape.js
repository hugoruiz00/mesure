import React from 'react';
import Vertex from './Vertex';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { calculateArea, getAdjustedShapeDimensions } from '../../utils/formulas';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { shapeSetted } from './shapeSlice';
import { PolygonArea } from './PolygonArea';
import { ButtonGroup } from '../../components/ButtonGroup';

function Shape() {
  const shape = useSelector(state => state.shape);
  const scale = useSelector(state => state.scale);
  const dispatch = useDispatch();

  const renderedVertices = shape.map((vertex) => {
    return <Vertex key={vertex.id} id={vertex.id} position={vertex.position}></Vertex>
  });

  return (
    <>
      <Text style={{
        position:'absolute',
        fontSize:20,
        color:'black',
        fontWeight:'bold'
      }}>{(calculateArea(shape) * scale**2).toFixed(5)}</Text>
      <PolygonArea shape={shape} scale={scale}></PolygonArea>
      {renderedVertices}
      <ButtonGroup/>
      <FloatingActionButton
        action={()=>{
          if (shape.length >= 3) {
            const shapeAdjusted = getAdjustedShapeDimensions(shape, scale);
            dispatch(shapeSetted(shapeAdjusted));
          }
        }}
        style={{
          position: 'absolute',
          bottom: 25,
          left: 12,
          borderRadius: 20,
          height: 50,
          width: 100,
        }}
        child={
          <Text style={{
            color:'#ffffff',
            fontSize:18,
            fontWeight:600,
            marginHorizontal:10,
          }}>
            Ajustar
          </Text>                  
        }
      />
    </>
  );
}

export default Shape;