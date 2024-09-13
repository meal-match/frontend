import React, { useState } from 'react'
import { Button, Text, TextInput } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'

import AuthPage from '@components/AuthPage'
import { userLogin } from '@store'

const styles = StyleSheet.create({
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
})

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLoginPress = async () => {
        await dispatch(userLogin)
    }

    return (
        <AuthPage>
            <Text>Login Screen</Text>
            <TextInput
                label="Username"
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
            <Button mode="contained" onPress={onLoginPress}>
                Login
            </Button>
            <Text
                onPress={() => router.replace('/auth/forgotPassword')}
                style={styles.link}
            >
                Forgot Password?
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

export default Login
