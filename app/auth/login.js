import React, { useEffect, useState } from 'react'
import {
    Button,
    HelperText,
    Text,
    TextInput,
    Checkbox
} from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'

import AuthPage from '@components/AuthPage'
import { userLogin, selectAuthError, selectAuthLoading } from '@store'

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const authError = useSelector(selectAuthError)
    const isLoading = useSelector(selectAuthLoading)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const onLoginPress = async () => {
        if (!email.length || !password.length) {
            setErrorText('Please fill out all fields')
            return
        }
        await dispatch(
            userLogin({ email: email + '@crimson.ua.edu', password })
        )
    }

    useEffect(() => {
        if (errorText.length && email.length && password.length) {
            setErrorText('')
        }
    }, [email, password])

    useEffect(() => {
        if (authError.type === 'userLogin') {
            setErrorText(authError.message)
        }
    }, [authError])

    return (
        <AuthPage header="Login">
            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ width: 350 }}
                inputMode="email"
                disabled={isLoading}
                right={<TextInput.Affix text="@crimson.ua.edu" />}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword}
                style={{ width: 350 }}
                disabled={isLoading}
            />
            <Checkbox.Item
                status={showPassword ? 'checked' : 'unchecked'}
                label={showPassword ? 'Hide Password' : 'Show Password'}
                onPress={() => setShowPassword(!showPassword)}
                position="leading"
                style={{ width: 350 }}
                labelStyle={{ textAlign: 'center' }}
                mode="android"
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
                onPress={() => router.replace('/auth/forgotPassword')}
                style={styles.link}
            >
                Forgot your password?
            </Text>
            <Text
                onPress={() => router.replace('/auth/createAccount')}
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
