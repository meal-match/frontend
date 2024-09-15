import React, { useEffect, useState } from 'react'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'

import AuthPage from '@components/AuthPage'
import { userLogin, selectAuthError, selectAuthLoading } from '@store'

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const loginError = useSelector(selectAuthError)
    const isLoading = useSelector(selectAuthLoading)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState('')

    const onLoginPress = async () => {
        if (!email.length || !password.length) {
            setErrorText('Please fill out all fields')
            return
        }
        await dispatch(userLogin({ email, password }))
    }

    useEffect(() => {
        if (errorText.length && email.length && password.length) {
            setErrorText('')
        }
    }, [email, password])

    useEffect(() => {
        if (loginError) {
            setErrorText(loginError)
        }
    }, [loginError])

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
                loading={isLoading}
                disabled={isLoading}
            >
                Login
            </Button>
            {errorText.length > 0 && (
                <HelperText type="error">{errorText}</HelperText>
            )}
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
