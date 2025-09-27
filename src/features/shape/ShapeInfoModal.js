import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { calculateArea } from "../../utils/formulas";
import { InputGroup } from "../../components/InputGroup";
import { useDispatch } from "react-redux";
import { shapeSetted } from "./shapeSlice";

export const ShapeInfoModal = ({shape, scale, modalVisible, setModalVisible}) => {
    const dispatch = useDispatch();
    const inputs = shape.map(({sideDistance})=> {return {value:sideDistance.toString(), status:'valid'}});

    const updateShape = (inputs) => {
        const shapeAux = shape.map((item, i) => {
            if (inputs[i] && inputs[i].value) {
                return {
                    ...item,
                    sideDistance: parseFloat(inputs[i].value), 
                };
            }
            return {...item}; 
        });
        
        dispatch(shapeSetted(shapeAux));
        setModalVisible(!modalVisible);
    }

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
                    <InputGroup
                        initialState={inputs}
                        onSave={updateShape}
                        btnSaveText={'Actualizar'}
                        canAdd={false}
                        canRemove={false}
                    />
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
    textArea : {
        fontSize:19,
        fontWeight:600,
        color:'#7624acff',
        marginBottom: 30
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