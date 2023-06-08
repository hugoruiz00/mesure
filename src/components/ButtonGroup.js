import { useState } from "react";
import { Text, View } from "react-native";
import { FloatingActionButton } from "./FloatingActionButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const ButtonGroup = () => {
    const [isExpanded, setExpanded] = useState(false);
  
    const handlePress = () => {
      setExpanded(!isExpanded);
    };
  
    return (
      <View>
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
                backgroundColor: isExpanded ? "#847192":"#7624ac",
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
                    name='arrow-collapse' 
                    size={30} 
                    color="#ffffff"/>}
                action={() => console.log('Botón 1 presionado')}
                style={{ marginBottom: 10, height: 50, width: 50,}}
            />
            <FloatingActionButton
                child={<Icon 
                    name='arrow-expand' 
                    size={30} 
                    color="#ffffff"/>}
                action={() => console.log('Botón 2 presionado')}
                style={{ marginBottom: 10, height: 50, width: 50,}}
            />
            <FloatingActionButton
                child={<Icon 
                    name='format-list-checkbox' 
                    size={30} 
                    color="#ffffff"/>}
                action={() => console.log('Botón 3 presionado')}
                style={{ height: 50, width: 50,}}
            />
          </View>
        )}
      </View>
    );
  };
  