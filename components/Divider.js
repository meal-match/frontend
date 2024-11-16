import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const Divider = ({ width = '100%', color = '#B3B3B3' }) => {
    const styles = StyleSheet.create({
        divider: {
            width,
            height: 1,
            backgroundColor: color
        }
    })

    return <View style={styles.divider}></View>
}

Divider.propTypes = {
    width: PropTypes.string,
    color: PropTypes.string
}

export default Divider
