import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    runOnJS, 
    useAnimatedReaction
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { vertexUpdated } from './shapeSlice';
import { Text } from 'react-native';

const Vertex = ({ id, position }) => {
  const dispatch = useDispatch();

  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const savedContext = useSharedValue({ startX: 0, startY: 0 });

  useAnimatedReaction(
    () => ({ x: position.x, y: position.y }),
    (latestPosition, previousPosition) => {
      if (latestPosition.x !== previousPosition?.x || latestPosition.y !== previousPosition?.y) {
        translateX.value = latestPosition.x;
        translateY.value = latestPosition.y;
      }
    },
    [position]
  );

  const dispatchUpdate = (x, y) => {
    const roundedX = parseFloat(x.toFixed(1));
    const roundedY = parseFloat(y.toFixed(1));

    dispatch(vertexUpdated({
      id,
      position: { x: roundedX, y: roundedY }
    }));
  };

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      savedContext.value = { 
        startX: translateX.value, 
        startY: translateY.value 
      };
    })
    .onUpdate((e) => {
      translateX.value = savedContext.value.startX + e.translationX;
      translateY.value = savedContext.value.startY + e.translationY;
    })
    .onEnd(() => {
      runOnJS(dispatchUpdate)(translateX.value, translateY.value);
    });


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            backgroundColor: '#7624acce',
            width: 30,
            height: 30,
            borderRadius: 100
          }
        ]}
      >
        <Text style={{
          fontSize: 20,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',

        }}>{id}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default Vertex;