import React from 'react'
import { StyleSheet, View } from 'react-native'
import { node } from 'prop-types'
import { Redirect, useRootNavigationState } from 'expo-router'
import { useSelector } from 'react-redux'

import { selectIsLoggedIn } from '@store'

import BottomNavBar from '@components/BottomNavBar'
import Container from '@components/Container'

const Page = ({ children }) => {
    const rootNavigationState = useRootNavigationState()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!rootNavigationState?.key) {
        return null
    }

    if (!isLoggedIn) {
        return <Redirect href="auth/login" />
    }

    return (
        <Container>
            <View style={styles.content}>{children}</View>
            <BottomNavBar />
        </Container>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 50
    }
})

Page.propTypes = {
    children: node.isRequired
}

export default Page
