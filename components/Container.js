import React from 'react'
import { node } from 'prop-types'
import { StyleSheet, View } from 'react-native'

const Container = ({ children }) => {
    return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

Container.propTypes = {
    children: node.isRequired
}

export default Container
