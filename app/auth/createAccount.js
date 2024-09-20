import React, { useState, useEffect } from 'react'
import { TextInput, HelperText, Button, Checkbox } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'

import AuthPage from '@components/AuthPage'
import {
    createUser,
    selectAuthLoading,
    selectAuthError,
    selectCreateAccount
} from '@store'

const CreateAccount = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const authLoading = useSelector(selectAuthLoading)
    const authError = useSelector(selectAuthError)
    const createAccountSuccess = useSelector(selectCreateAccount)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [badEmail, setBadEmail] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordRequirements, setPasswordRequirements] = useState([])
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        const emailRegex = /^[\w-\\.]+@crimson\.ua\.edu$/
        if (email.length > 0 && !emailRegex.test(email)) {
            setBadEmail(true)
        } else {
            setBadEmail(false)
        }
    }, [email])

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

    useEffect(() => {
        if (authError) {
            setErrorText(authError)
        }
    }, [authError])

    useEffect(() => {
        if (createAccountSuccess) {
            router.push('/auth/login')
        }
    }, [createAccountSuccess])

    const onCreatePress = async () => {
        if (
            !firstName.length ||
            !lastName.length ||
            !email.length ||
            !password.length
        ) {
            setErrorText('Please fill out all fields')
            return
        }
        setErrorText('')
        if (badEmail || passwordRequirements.length) {
            return
        }

        await dispatch(
            createUser({
                firstName,
                lastName,
                email,
                password
            })
        )
    }

    return (
        <AuthPage header="Create Account">
            <TextInput
                label="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={{ width: 350 }}
            />
            <TextInput
                label="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={{ width: 350 }}
            />
            <TextInput
                label="Crimson Email"
                value={email}
                onChangeText={setEmail}
                style={{ width: 350 }}
            />
            {badEmail && (
                <HelperText type="error" visible={badEmail}>
                    Email must be your student crimson email address!
                </HelperText>
            )}
            {passwordRequirements.length > 0 && (
                <HelperText type="error">
                    {passwordRequirements.join('\n')}
                </HelperText>
            )}
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={{ width: 350 }}
            />
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
                onPress={onCreatePress}
                loading={authLoading}
                disabled={authLoading}
            >
                Create
            </Button>
            {errorText.length > 0 && (
                <HelperText type="error">{errorText}</HelperText>
            )}
        </AuthPage>
    )
}

export default CreateAccount
