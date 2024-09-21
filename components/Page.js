import React from 'react'
import { StyleSheet, View } from 'react-native'
import { node, object, string } from 'prop-types'
import { useRouter, useFocusEffect } from 'expo-router'
import { useSelector } from 'react-redux'
import { Text } from 'react-native-paper'

import { selectIsLoggedIn } from '@store'

import BottomNavBar from '@components/BottomNavBar'
import Container from '@components/Container'

const Page = ({ style, header, children }) => {
    const router = useRouter()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useFocusEffect(() => {
        if (!isLoggedIn) {
            router.replace('/auth/login')
        }
    })

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
        textAlign: 'center',
        marginLeft: '4%',
        marginBottom: 8
    },
    content: {
        flex: 1,
        width: '100%'
    }
})

Page.propTypes = {
    style: object,
    header: string,
    children: node.isRequired
}

export default Page
