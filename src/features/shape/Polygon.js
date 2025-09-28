import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSharedValue, useDerivedValue, runOnJS } from 'react-native-reanimated'; 
import { Gesture, GestureDetector } from 'react-native-gesture-handler'; 

export const Polygon = ({ shape, coordinates, dispatch, shapeSetted }) => {
  const skiaCoordinates = useSharedValue(coordinates); 
  const currentTranslateX = useSharedValue(0); 
  const currentTranslateY = useSharedValue(0);
  const totalTranslateX = useSharedValue(0);
  const totalTranslateY = useSharedValue(0);

  useEffect(() => {
    skiaCoordinates.value = coordinates;
  }, [coordinates]);

  const path = useDerivedValue(() => {
    const p = Skia.Path.Make();
    const currentCoords = skiaCoordinates.value; 
    const offsetX = currentTranslateX.value + 10;
    const offsetY = currentTranslateY.value + 10;

    if (currentCoords.length > 0) {
      p.moveTo(currentCoords[0].x + offsetX, currentCoords[0].y + offsetY);
      for (let i = 1; i < currentCoords.length; i++) {
        p.lineTo(currentCoords[i].x + offsetX, currentCoords[i].y + offsetY);
      }
      p.close();
    }
    return p;
  }, [skiaCoordinates, currentTranslateX, currentTranslateY]);

  const updateStoreAfterDrag = React.useCallback(
    (event) => {
      const shapeAux = shape.map(vertex => ({
        ...vertex,
        position: {
          x: vertex.position.x + event.translationX,
          y: vertex.position.y + event.translationY,
        }
      }));
      dispatch(shapeSetted(shapeAux));
    },
    [shape, dispatch, shapeSetted]
  );

  const panGesture = Gesture.Pan()
    .onStart(() => {
      totalTranslateX.value = currentTranslateX.value;
      totalTranslateY.value = currentTranslateY.value;
    })
    .onUpdate((event) => {
      currentTranslateX.value = totalTranslateX.value + event.translationX;
      currentTranslateY.value = totalTranslateY.value + event.translationY;
    })
    .onEnd((event) => {
      runOnJS(updateStoreAfterDrag)(event); 
      currentTranslateX.value = 0;
      currentTranslateY.value = 0;
    });

  return (
    <GestureDetector gesture={panGesture} style={styles.container}>
      <Canvas style={styles.canvas}>
        <Path
          path={path}
          color="#b965da96"
          style="fill"
        />
      </Canvas>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  canvas: { flex: 1 }
})