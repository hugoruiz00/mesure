import React from 'react';
import Vertex from './Vertex';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { calculateArea, getAdjustedShapeDimensions } from '../../utils/formulas';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { shapeSetted } from './shapeSlice';
import { PolygonArea } from './PolygonArea';
import { ButtonGroup } from '../../components/ButtonGroup';
import { ShapeSideDistance } from './ShapeSideDistance';
import { useState } from 'react';

function Shape() {
  const [distanceInShape, setDistanceInShape] = useState(true);
  const shape = useSelector(state => state.shape);
  const scale = useSelector(state => state.scale);
  const dispatch = useDispatch();

  const renderedVertices = shape.map((vertex) => {
    return <Vertex key={vertex.id} id={vertex.id} position={vertex.position}></Vertex>
  });

  return (
    <>
      <View style={styles.areaContainer}>
        <Text style={styles.textArea}>
            Área:
        </Text>
        <Text style={styles.areaValue}>
          {(calculateArea(shape) * scale**2).toFixed(5)}
        </Text>
      </View>
      <PolygonArea shape={shape} scale={scale} distanceInShape={distanceInShape}></PolygonArea>
      {renderedVertices}
      {!distanceInShape && <ShapeSideDistance shape={shape} scale={scale}/>}
      <ButtonGroup distanceInShape={distanceInShape} setDistanceInShape={setDistanceInShape}/>
      <FloatingActionButton
        action={()=>{
          if (shape.length >= 3) {
            const shapeAdjusted = getAdjustedShapeDimensions(shape, scale);
            dispatch(shapeSetted(shapeAdjusted));
          }
        }}
        style={styles.floatingButton}
        child={
          <Text style={styles.textAdjust}>
            Ajustar
          </Text>                  
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  areaContainer: {
    position:'absolute',
    top:10,
    left:10,
    flexDirection: 'row',
  },
  textArea: {
    fontSize:20,
    color:'black',
    fontWeight:'bold',
    marginRight:5,
  },
  areaValue: {
    fontSize:20,
    color:'black',
    fontWeight:500
  },
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    left: 12,
    borderRadius: 20,
    height: 50,
    width: 100,
  },
  textAdjust: {
    color:'#ffffff',
    fontSize:18,
    fontWeight:600,
    marginHorizontal:10,
  }
});

export default Shape;