import React, { useState } from 'react'
import { Button, Text, TextInput } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'

import AuthPage from '@components/AuthPage'
import { userLogin } from '@store'

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLoginPress = async () => {
        await dispatch(userLogin(email, password))
    }

    return (
        <AuthPage header="Login">
            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ width: 350 }}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{ width: 350 }}
            />
            <Button
                mode="contained"
                onPress={onLoginPress}
                style={styles.loginButton}
            >
                Login
            </Button>
            <Text
                onPress={() => router.push('/auth/forgotPassword')}
                style={styles.link}
            >
                Forgot your password?
            </Text>
            <Text
                onPress={() => router.push('/auth/createAccount')}
                style={styles.link}
            >
                Don&apos;t have an account?
            </Text>
        </AuthPage>
    )
}

const styles = StyleSheet.create({
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 16
    },
    loginButton: {
        width: 350
    }
})

export default Login
