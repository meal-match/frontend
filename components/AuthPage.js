import React from 'react'
import { StyleSheet, View } from 'react-native'
import { node, object, string } from 'prop-types'
import { Redirect, useRootNavigationState } from 'expo-router'
import { useSelector } from 'react-redux'
import { Text } from 'react-native-paper'

import { selectIsLoggedIn } from '@store'
import Container from '@components/Container'

const AuthPage = ({ header, style, children }) => {
    const rootNavigationState = useRootNavigationState()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!rootNavigationState?.key) {
        return null
    }

    if (isLoggedIn) {
        return <Redirect href="/" />
    }

    return (
        <Container>
            <View style={styles.page}>
                {header && (
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{header}</Text>
                    </View>
                )}
                <View style={[style, styles.content]}>{children}</View>
            </View>
        </Container>
    )
}

AuthPage.propTypes = {
    header: string,
    children: node.isRequired,
    style: object
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center'
    },
    header: {
        marginTop: 8,
        borderBottomColor: '#828A8F',
        borderBottomWidth: 2,
        marginBottom: 16,
        width: '100%'
    },
    headerText: {
        fontSize: 24,
        color: '#404040',
        textAlign: 'center',
        marginBottom: 8
    }
})

export default AuthPage
