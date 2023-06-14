import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const InputGroup = ({inputs, setInputs, canAdd, canRemove}) => {

    const handleAddInput = () => {
        setInputs([...inputs, {value:'', status:'empty'}]);
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

    const handleRemoveInput = (index) => {
        if(inputs.length > 3){
            const newInputs = [...inputs];
            newInputs.splice(index, 1);
            setInputs(newInputs);
        }else{
            Alert.alert(
                'Aviso',
                'Debe haber por lo menos tres lados para calcular el área',
                [{text: 'Aceptar', style: 'cancel'}],
                {cancelable: true},
            );
        }
    }

    return (
        <>
            {inputs.map((input, index) => (
                <View key={index} style={{marginBottom:15}}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.labelInput}>Lado {index+1}</Text>
                        <TextInput
                            keyboardType='numeric'
                            style={styles.textInput}
                            value={input.value}
                            placeholder='Ingrese la medida'
                            onChangeText={value => handleInputChange(value, index)}
                        />
                        {canRemove &&
                        <TouchableOpacity
                            onPress={() => handleRemoveInput(index)}
                        >
                            <Icon name='minus-circle-outline' size={32} color="#df3d3d"/>
                        </TouchableOpacity>}
                    </View>
                    {input.status=='invalid' && <Text style={styles.textError}>Ingrese un número válido</Text>}
                </View>
            ))}
            {canAdd &&
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAddInput()}
            >
                <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>+ Agregar</Text>
            </TouchableOpacity>}
        </>
    );
}

const styles = StyleSheet.create({
    labelInput: {
        fontSize:16,
        fontWeight:400,
        color: '#333333',
    },
    textInput: {
        width: '70%',
        marginHorizontal: 15,
        padding: 10,
        borderWidth: 2,
        borderColor: '#b3b3b3',
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
});