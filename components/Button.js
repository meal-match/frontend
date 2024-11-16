import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { string } from 'prop-types'

const Button = ({ url, text, height }) => {
    const router = useRouter()

    const onPress = () => {
        router.push(url)
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { height: height }]}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF', // Button background color
        paddingVertical: 12, // Vertical padding
        paddingHorizontal: 24, // Horizontal padding
        borderRadius: 15, // Rounded corners
        shadowColor: '#000000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 4, // Shadow blur
        elevation: 5, // Android elevation
        width: '70%',
        // height: '255%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#9E1B32',
        fontSize: 30,
        fontWeight: '500'
    }
})

Button.propTypes = {
    url: string.isRequired,
    text: string.isRequired,
    height: string.isRequired
}

export default Button
