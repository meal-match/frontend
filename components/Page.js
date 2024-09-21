import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { node, object, string } from 'prop-types'
import { useRouter, useFocusEffect } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, Text } from 'react-native-paper'

import { checkAuthStatus, selectCheckAuthFail, selectIsLoggedIn } from '@store'

import BottomNavBar from '@components/BottomNavBar'
import Container from '@components/Container'

const Page = ({ style, header, children }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const checkAuthFail = useSelector(selectCheckAuthFail)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useFocusEffect(() => {
        if (!isLoggedIn) {
            dispatch(checkAuthStatus)
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (checkAuthFail) {
            router.replace('/auth/login')
        }
    }, [checkAuthFail])

    if (!isLoggedIn) {
        return (
            <Container>
                <ActivityIndicator size="large" />
            </Container>
        )
    }

    return (
        <Container>
            <View style={styles.content}>
                {header && (
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{header}</Text>
                    </View>
                )}
                <View style={style}>{children}</View>
            </View>
            <BottomNavBar />
        </Container>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 8,
        borderBottomColor: '#828A8F',
        borderBottomWidth: 2
    },
    headerText: {
        fontSize: 24,
        color: '#404040',
        textAlign: 'left',
        marginLeft: '4%',
        marginBottom: 8
    },
    content: {
        flex: 1
    }
})

Page.propTypes = {
    style: object,
    header: string,
    children: node.isRequired
}

export default Page
