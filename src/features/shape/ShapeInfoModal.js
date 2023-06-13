import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Select } from "../../components/Select";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { calculateArea } from "../../utils/formulas";

export const ShapeInfoModal = ({shape, scale, modalVisible, setModalVisible}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible) }
        >
            <View style={styles.centerView}>
                <View style={styles.container}>
                    <Text style={styles.textArea}>Área: {(calculateArea(shape) * scale**2).toFixed(5)}</Text>
                    <View style={styles.formGroup}>
                        <Text style={styles.selectLabel}>Unidad de medida de los lados</Text>
                        <Select
                            data={['Centímetro', 'Metro', 'Kilómetro']}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.selectLabel}>Unidad de medida del área</Text>
                        <Select
                            data={['Centímetro\u00B2', 'Metro\u00B2', 'Kilómetro\u00B2']}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={()=> setModalVisible(!modalVisible) }
                    >
                        <Icon name='close' size={26} color="#ffffff"/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centerView: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5a5a5a7a'
    },
    container: {
        height:'85%',
        width:'90%',
        backgroundColor:'#ffffff',
        borderRadius:20,
        padding:25,
    },
    formGroup : {
        marginVertical:8,
    },
    selectLabel : {
        fontSize:17,
        fontWeight:600,
        color:'#363636',
        marginBottom: 4
    },
    textArea : {
        fontSize:19,
        fontWeight:600,
        color:'#7624acff',
        marginBottom: 4
    },
    closeButton : {
        justifyContent:'center',
        alignItems: "center",
        backgroundColor: "#5a5a5a7a",
        borderRadius: 100,
        height: 35,
        width: 35,
        position: 'absolute',
        top:10,
        right:10
    }
});