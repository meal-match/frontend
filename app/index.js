import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Index() {
    return (
        <View style={styles.container}>
            <Text>Edit app/index.js to edit this screen.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
