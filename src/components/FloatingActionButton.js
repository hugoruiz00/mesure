import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export const FloatingActionButton = ({ action }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={action}
        >
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#2b50aa",
        borderRadius: 100,
        height: 60,
        width: 60,
        position: 'absolute',
        bottom: 20,
        right: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
});