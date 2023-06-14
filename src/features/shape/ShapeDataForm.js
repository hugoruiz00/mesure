import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { shapeSetted } from './shapeSlice';
import { scaleSetted } from '../scale/scaleSlice';
import { InputGroup } from '../../components/InputGroup';

function ShapeDataForm({navigation}) {
    const dispatch = useDispatch();

    const setShapeInitialState = (inputs) => {
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
            <Text style={styles.title}>
                Ingrese las medidas de los lados
            </Text>
            <InputGroup
                initialState={[
                    {value:'', status:'empty'},
                    {value:'', status:'empty'},
                    {value:'', status:'empty'}
                ]}
                onSave={setShapeInitialState}
                btnSaveText={'Continuar'}
                canAdd={true}
                canRemove={true}
            />
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
});

export default ShapeDataForm;