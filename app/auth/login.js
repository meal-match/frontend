import React, { useEffect } from 'react'
import { Button, Text } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import AuthPage from '@components/AuthPage'
import { userLogin, selectIsLoggedIn } from '@store'

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()

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
            <Button mode="contained" onPress={onLoginPress}>
                Login
            </Button>
        </AuthPage>
    )
}

export default Login
