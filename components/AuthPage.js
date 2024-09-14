import React from 'react'
import { StyleSheet } from 'react-native'
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
        <Container style={[style, styles.page]}>
            <Text variant="displayMedium" style={{ color: 'black' }}>
                {header}
            </Text>
            {children}
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
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    }
})

export default AuthPage
