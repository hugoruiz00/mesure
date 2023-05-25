import { Line } from "react-native-svg";
import {Text } from 'react-native';

export const LineConnector = ({start, end}) => {

  const calculateDistance = (x1, y1, x2, y2) => {
    const distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    return distance;
  }

  return (  
    <>
      <Line
        x1={start.x + 15}
        y1={start.y + 10}
        x2={end.x + 15}
        y2={end.y + 10}
        stroke="#bdbbbb"
        strokeWidth="5"
      />
      <Text style={{
          position: 'absolute',
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          left: (start.x + end.x) / 2,
          top: (start.y + end.y) / 2,
        }}>
        {calculateDistance(start.x, start.y, end.x, end.y).toFixed(2)}
      </Text>
    </>
  );
};