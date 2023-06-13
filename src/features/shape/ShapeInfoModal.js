import { Modal, StyleSheet, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ShapeInfoModal = ({modalVisible, setModalVisible}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible) }
        >
            <View style={styles.centerView}>
                <View style={styles.container}>
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
    },
    closeButton : {
        justifyContent:'center',
        alignItems: "center",
        backgroundColor: "#5a5a5a7a",
        borderRadius: 100,
        height: 40,
        width: 40,
        position: 'absolute',
        top:10,
        right:10
    }
});