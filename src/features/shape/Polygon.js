import {Canvas, Path, Skia} from "@shopify/react-native-skia";
 
export const Polygon = ({coordinates, panResponder}) => {
  const path = coordinates.reduce((current, point) => {
    current.lineTo(point.x+10, point.y+10);
    return current;
  }, Skia.Path.MakeFromSVGString(`M ${coordinates[0].x+10} ${coordinates[0].y+10}`));

  return (
    <Canvas style={{ flex: 1 }}
    {...panResponder.panHandlers}>
      <Path
        path={path}
        color="#b965da96"
      />
    </Canvas>
  );
};