import { useState } from "react";
import { View } from "react-native";
import { FloatingActionButton } from "./FloatingActionButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { scaleSetted } from '../features/scale/scaleSlice';
import { calculateDistance, coordinateExists, getXCoordinate, getYCoordinate } from "../utils/formulas";
import { shapeSetted } from "../features/shape/shapeSlice";
import { ShapeInfoModal } from "../features/shape/ShapeInfoModal";

export const ButtonGroup = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const scale = useSelector(state => state.scale);
    const shape = useSelector(state => state.shape);
    const dispatch = useDispatch();
    const [isExpanded, setExpanded] = useState(false);
  
    const handlePress = () => {
      setExpanded(!isExpanded);
    };

    const updateScale = (newScale) => {
      const currentShape = [...shape];
      const shapeAdjusted = getAdjustedShapeWithNewScale(currentShape, scale, newScale);
      dispatch(scaleSetted(newScale));
      dispatch(shapeSetted(shapeAdjusted));
    }

    const getAdjustedShapeWithNewScale = (shape, scale, newScale) => {
      const scaleChange = scale / newScale;
      for (let index = 1; index < shape.length; index++) {
        const nextIndex = index==shape.length-1 ? 0 : index+1;
        const prevVertex = shape[index - 1];
        const currentVertex = shape[index];
        const nextVertex = shape[nextIndex];
  
        prevVertexDistance = (calculateDistance(prevVertex.position.x, prevVertex.position.y, currentVertex.position.x, currentVertex.position.y) * newScale).toFixed(2) * scaleChange;
        currentVertexDistance = (calculateDistance(currentVertex.position.x, currentVertex.position.y, nextVertex.position.x, nextVertex.position.y) * newScale).toFixed(2) * scaleChange;

        if(coordinateExists(prevVertex.position, nextVertex.position, prevVertexDistance/newScale, currentVertexDistance/newScale)){
          const xCoordinate = getXCoordinate(prevVertex.position, nextVertex.position, currentVertex.position, prevVertexDistance/newScale, currentVertexDistance/newScale);
          const yCoordinate = getYCoordinate(prevVertex.position, nextVertex.position, currentVertex.position, prevVertexDistance/newScale, currentVertexDistance/newScale);
          shape[index].position = {x: xCoordinate, y: yCoordinate};
        }
      }
      return shape;
    }
  
    return (
      <View>
        <ShapeInfoModal
          shape={shape}
          scale={scale}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <FloatingActionButton
            child={
                <Icon 
                name={isExpanded ? 'close':'plus'} 
                size={30} 
                color="#ffffff"/>
            }
            action={handlePress}
            style={{
                position: 'absolute',
                bottom: 20,
                right: 12,
                backgroundColor: isExpanded ? "#9976b1":"#7624ac",
            }}
        />
        {isExpanded && (
          <View
            style={{
              position: 'absolute',
              right: 18,
              bottom: 90,
            }}
          >
            <FloatingActionButton
                child={<Icon 
                    name='magnify-plus-outline' 
                    size={30} 
                    color="#ffffff"/>}
                action={() => {
                  const newScale = (scale * 0.9).toFixed(2);
                  updateScale(newScale);
                }}
                style={{ marginBottom: 10, height: 50, width: 50,}}
            />
            <FloatingActionButton
                child={<Icon 
                    name='magnify-minus-outline' 
                    size={30} 
                    color="#ffffff"/>}
                action={() => {
                  const newScale = (scale * 1.1).toFixed(2);
                  updateScale(newScale);
                }}
                style={{ marginBottom: 10, height: 50, width: 50,}}
            />
            <FloatingActionButton
                child={<Icon 
                    name='square-edit-outline' 
                    size={30} 
                    color="#ffffff"/>}
                action={() => setModalVisible(true)}
                style={{ height: 50, width: 50,}}
            />
          </View>
        )}
      </View>
    );
  };
  