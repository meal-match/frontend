import React, { useEffect, useState } from 'react'
import { Button, Text, TextInput } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import AuthPage from '@components/AuthPage'
import { userLogin, selectIsLoggedIn } from '@store'

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isLoggedIn = useSelector(selectIsLoggedIn)

    const onLoginPress = async () => {
        await dispatch(userLogin)
    }

    useEffect(() => {
        if (isLoggedIn) {
            router.replace('/')
        }
    }, [isLoggedIn])

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
                onPress={() => router.replace('/auth/forgot')}
                style={{ color: 'blue', textDecorationLine: 'underline' }}
            >
                Forgot Password?
            </Text>
            <Text
                onPress={() => router.replace('/auth/create')}
                style={{ color: 'blue', textDecorationLine: 'underline' }}
            >
                Don&apos;t have an account?
            </Text>
        </AuthPage>
    )
}

export default Login
