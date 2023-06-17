import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

export const FloatingActionButton = ({ action, style, child }) => {
    return (
        <TouchableOpacity
            style={{...styles.button, ...style}}
            onPress={action}
        >
            {child}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent:'center',
        alignItems: "center",
        backgroundColor: "#7624ac",
        borderRadius: 100,
        height: 60,
        width: 60,
    },
});