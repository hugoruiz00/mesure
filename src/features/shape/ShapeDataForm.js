import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text } from 'react-native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { shapeSetted } from './shapeSlice';
import { scaleSetted } from '../scale/scaleSlice';
import { InputGroup } from '../../components/InputGroup';

function ShapeDataForm({navigation}) {
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState([
        {value:'', status:'empty'},
        {value:'', status:'empty'},
        {value:'', status:'empty'}
    ]);

    const handleOnSave = () => {
        if(validadInputs()){
            setShapeInitialState();
        }else{
            Alert.alert(
                'Aviso',
                'Ingrese números válidos en todos los campos',
                [{text: 'Aceptar', style: 'cancel'}],
                {cancelable: true},
            );
        }
    }

    const validadInputs = () => {
        let isValid = true;
        inputs.forEach(input => {
            if(input.status!='valid'){
                isValid = false;
                return;
            }
        });
        return isValid;
    }

    const setShapeInitialState = () => {
        const amountIncrease = 80;
        let xPosition = amountIncrease-50;
        let yPosition = amountIncrease-50;
        const shapeDimensions = inputs.map((input, index) => {
            if(index == Math.round(inputs.length/2)) xPosition += amountIncrease;
            if(index >= inputs.length/2) yPosition -= amountIncrease;
            else yPosition += amountIncrease;

            return {id: index+1, position:{x: xPosition, y: yPosition}, sideDistance: parseFloat(input.value)}
        });
        dispatch(shapeSetted(shapeDimensions));
        const maxSideDistance = Math.max(...shapeDimensions.map(vertex => vertex.sideDistance));
        const scale = (maxSideDistance * 2) / Dimensions.get('window').width;
        dispatch(scaleSetted(scale.toFixed(2)));
        navigation.navigate('Shape');
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{marginBottom:10}}>
                <Text style={styles.title}>
                    Ingrese las medidas de los lados
                </Text>
                <InputGroup
                    inputs={inputs}
                    setInputs={setInputs}
                    canAdd={true}
                    canRemove={true}
                />
            </ScrollView>
            <TouchableOpacity
                style={styles.buttonSave}
                onPress={() => handleOnSave()}
            >
                <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize:19,
        fontWeight:500,
        color: '#292929',
        marginBottom:25,
    },
    buttonSave: {
        alignSelf:'center',
        alignItems:'center',    
        justifyContent: 'center',
        backgroundColor: "#7524ac",
        borderRadius: 10,
        height: 50,
        width: '75%',
        marginBottom: 20,
    }
});

export default ShapeDataForm;