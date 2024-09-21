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
        if (passwordReset) {
            router.replace('/auth/login')
        }
    }, [passwordReset])

    useEffect(() => {
        if (authError) {
            setErrorText(authError)
        }
    }, [authError])

    useEffect(() => {
        if (password.length) {
            const requirements = []
            if (password.length > 0 && password.length < 8) {
                requirements.push('At least 8 characters')
            }
            if (!password.match(/[0-9]/)) {
                requirements.push('One number')
            }
            if (!password.match(/[A-Z]/)) {
                requirements.push('One uppercase letter')
            }
            if (!password.match(/[a-z]/)) {
                requirements.push('One lowercase letter')
            }
            if (!password.match(/[!@#$%^&*]/)) {
                requirements.push('One special character - !@#$%^&*')
            }
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
            <HelperText type="error" visible={errorText.length > 0}>
                {errorText}
            </HelperText>
        </AuthPage>
    )
}

export default ResetPassword
