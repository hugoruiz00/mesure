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
                    <View style={{flexDirection:'row', alignItems:'center', marginBottom:-3}}>
                        <View style={styles.circleView}>
                            <Text style={styles.textCircle}>{index+1}</Text>
                        </View>
                        <Text style={{fontSize:22, fontWeight:900, color:'#7624acce', marginHorizontal:2}}>-</Text>
                        <View style={styles.circleView}>
                            <Text style={styles.textCircle}>{index==shape.length-1 ? 1:index+2}</Text>
                        </View>
                    </View>
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
    circleView: {
        backgroundColor:'#7624acce',
        width:24,
        height:24,
        borderRadius:100
    },
    textCircle: {
        fontSize:17,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
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
    }
});