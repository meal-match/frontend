import React, { useEffect, useState } from 'react'
import {
    HelperText,
    Text,
    TextInput,
    Button,
    Checkbox
} from 'react-native-paper'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import AuthPage from '@components/AuthPage'
import {
    resetPassword,
    selectAuthError,
    selectAuthLoading,
    selectPasswordReset
} from '@store'
import { checkPasswordRequirements } from '@utils'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const localSearchParams = useLocalSearchParams()
    const token = localSearchParams.token

    const authError = useSelector(selectAuthError)
    const authLoading = useSelector(selectAuthLoading)
    const passwordReset = useSelector(selectPasswordReset)

    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const [passwordRequirements, setPasswordRequirements] = useState([])
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (authError.type === 'resetPassword') {
            setErrorText(authError.message)
        }
    }, [authError])

    useEffect(() => {
        if (password.length) {
            const requirements = checkPasswordRequirements(password)
            setPasswordRequirements(requirements)
        } else {
            setPasswordRequirements([])
        }
    }, [password])

    const onSubmitPress = async () => {
        if (!password.length) {
            setErrorText('Please input a new password')
            return
        }
        setErrorText('')
        if (passwordRequirements.length) {
            return
        }
        await dispatch(resetPassword({ token, password }))
    }

    return (
        <AuthPage header="Reset Password">
            <Text style={{ color: 'black', width: 350 }}>
                Enter your new password
            </Text>
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={{ width: 350 }}
            />
            {passwordRequirements.length > 0 && (
                <HelperText type="error">
                    {passwordRequirements.join('\n')}
                </HelperText>
            )}
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
                onPress={onSubmitPress}
                loading={authLoading}
                disabled={authLoading}
                style={{ width: 350 }}
            >
                Submit
            </Button>
            {passwordReset && (
                <Text style={{ color: 'green', width: 350 }}>
                    Password reset successfully! You can now login with your new
                    password.
                </Text>
            )}
            {errorText.length > 0 && (
                <HelperText type="error">{errorText}</HelperText>
            )}
            <Text
                style={{ color: 'blue', textDecorationLine: 'underline' }}
                onPress={() => router.replace('/auth/login')}
            >
                Back to Login
            </Text>
        </AuthPage>
    )
}

export default ResetPassword
