import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Divider = ({ width = '100%', color = '#B3B3B3' }) => {
    const styles = StyleSheet.create({
        divider: {
            width,
            height: 1,
            backgroundColor: color
        }
    })

    return <View style={styles.divider} />
}

Divider.propTypes = {
    width: PropTypes.string,
    color: PropTypes.string
}

export default Divider
