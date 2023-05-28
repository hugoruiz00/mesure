import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ShapeDataForm() {
    const [inputs, setInputs] = useState([]);

    const handleAddInput = () => {
        setInputs([...inputs, {value:'', status:'empty'}]);
    }

    const handleRemoveInput = (index) => {
        if(inputs.length > 3){
            const newInputs = [...inputs];
            newInputs.splice(index, 1);
            setInputs(newInputs);
        }
    }

    const handleInputChange = (value, index) => {        
        const newInputs = [...inputs];
        newInputs[index] = {value, status:inputValueStatus(value)};
        setInputs(newInputs);
    }

    const inputValueStatus = (value) =>{
        const isValid = value.match(/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
        return isValid ? 'valid' : 'invalid';
    }

    const handleOnSave = () => {
        console.log(validateInputs());
    }

    const validateInputs = () => {
        let isValid = true;
        inputs.forEach(input => {
            if(input.status!='valid'){
                isValid = false;
                return;
            }
        });
        return isValid;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{marginBottom:10}}>
                {
                    inputs.map((input, index) => (
                        <View key={index} style={{marginBottom:15}}>
                            <View style={styles.inputContainer}>
                                <Text>Lado {index+1}</Text>
                                <TextInput
                                    keyboardType='numeric'
                                    style={styles.textInput}
                                    value={input.value}
                                    placeholder='Ingrese la medida'
                                    onChangeText={value => handleInputChange(value, index)}
                                />
                                <TouchableOpacity
                                    onPress={() => handleRemoveInput(index)}
                                >
                                    <Icon name='minus-square-o' size={32} color="#df3d3d"/>
                                </TouchableOpacity>
                            </View>
                            {input.status=='invalid' && <Text style={styles.textError}>Ingrese un número válido</Text>}
                        </View>
                    ))
                }
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleAddInput()}
                >
                    <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>+ Agregar</Text>
                </TouchableOpacity>
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
    textInput: {
        width: '70%',
        marginHorizontal: 15,
        padding: 10,
        borderWidth: 2,
        borderColor: '#9999997c',
        borderRadius: 10,
    },
    textError: {
        fontSize:14,
        color: '#df3d3d',
        textAlign:'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    button: {
        alignSelf:'center',
        alignItems:'center',    
        justifyContent:'center',
        backgroundColor: "#7524ac",
        borderRadius: 10,
        height: 45,
        width: '50%',
        marginBottom:20,
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