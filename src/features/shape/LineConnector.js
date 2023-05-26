import { Line } from "react-native-svg";
import {Text } from 'react-native';
import { calculateDistance } from "../../utils/formulas";

export const LineConnector = ({start, end}) => {

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
        {calculateDistance(start.x, start.y, end.x, end.y)}
      </Text>
    </>
  );
};