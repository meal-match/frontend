import { arrayOf, node, object, oneOfType } from 'prop-types'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Container = ({ style, children }) => {
    return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

Container.propTypes = {
    children: node.isRequired,
    style: oneOfType([object, arrayOf(object)])
}

export default Container
