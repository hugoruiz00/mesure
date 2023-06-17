import { Text } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { calculateDistance } from "../../utils/formulas";
import { StyleSheet } from "react-native";

export const ShapeSideDistance = ({shape, scale}) => {
    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor:'#9191911c', borderRadius:10}}>
                {shape.map((vertex, index) => {
                const start = vertex.position;
                const nextIndex = (index + 1) % shape.length;
                const end = shape[nextIndex].position;
                
                return (
                    <View key={index} style={{marginBottom:10,}}>  
                        <Text style={styles.textNumberSide}>
                            L{index+1}
                        </Text>
                        <Text style={styles.textCurrentDistance}>
                            {(calculateDistance(start.x, start.y, end.x, end.y) * scale).toFixed(2)}
                        </Text>
                        <Text style={styles.textRealDistance}>
                            {vertex.sideDistance}
                        </Text>
                    </View>
                );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        right:7,
        top:5,
        height:'50%',
        zIndex:1
    },
    textCurrentDistance: {
        fontSize: 18,
        fontWeight: 700,
        color: '#575757',
        marginBottom:-3
    },
    textRealDistance: {
        fontSize: 18,
        fontWeight: 700,
        color: '#272727',
    },
    textNumberSide: {
        fontSize:18,
        fontWeight:800,
        color:'#7624acce',
        marginBottom:-3
    }
});