import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ShapeDataForm() {
    const [inputs, setInputs] = useState([]);

    const handleAddInput = () => {
        setInputs([...inputs, ""]);
    }

    const handleRemoveInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    }

    const handleInputChange = (value, index) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{marginBottom:10}}>
                {
                    inputs.map((input, index) => (
                        <View key={index} style={styles.inputContainer}>
                            <Text>A - B</Text>
                            <TextInput
                                style={styles.textInput}
                                value={input}
                                placeholder='Ingrese la medida'
                                onChangeText={value => handleInputChange(value, index)}
                            />
                            <TouchableOpacity
                                onPress={() => handleRemoveInput(index)}
                            >
                                <Icon name='minus-square-o' size={32} color="#df3d3d"/>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAddInput()}
            >
                <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>+ Agregar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    textInput: {
        width: '70%',
        marginHorizontal: 15,
        padding: 10,
        borderWidth: 2,
        borderColor: '#9999997c',
        borderRadius: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
    },
    button: {
        alignSelf:'center',
        alignItems:'center',    
        justifyContent:'center',
        backgroundColor: "#7524ac",
        borderRadius: 10,
        height: 55,
        width: '70%',
    }
});

export default ShapeDataForm;