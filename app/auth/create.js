import React, { useState, useEffect } from 'react'
import { Text, TextInput, HelperText, Button } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import AuthPage from '@components/AuthPage'
import { createUser, selectIsLoggedIn } from '@store'

const CreateAccount = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [badEmail, setBadEmail] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    useEffect(() => {
        const re = /^[\w-\\.]+@crimson.ua.edu$/
        if (email.length > 0 && !re.test(email)) {
            setBadEmail(true)
        } else {
            setBadEmail(false)
        }
    }, [email])

    useEffect(() => {
        if (passwordConfirm.length > 0 && passwordConfirm == password) {
            setPasswordsMatch(true)
        } else {
            setPasswordsMatch(false)
        }
    }, [isLoggedIn])

    const onCreatePress = async () => {
        //TODO: form validation
        await dispatch(createUser)
    }

    const isLoggedIn = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            router.replace('/')
        }
    }, isLoggedIn)

    return (
        <AuthPage>
            <Text variant="displayMedium" style={{ color: 'black' }}>
                Create Account
            </Text>
            <TextInput
                label="First Name"
                value={fName}
                onChangeText={setFName}
                style={{ width: 350 }}
            />
            <TextInput
                label="Last Name"
                value={lName}
                onChangeText={setLName}
                style={{ width: 350 }}
            />
            <TextInput
                label="Crimson Email"
                value={email}
                onChangeText={setEmail}
                style={{ width: 350 }}
            />
            <HelperText type="error" visible={badEmail}>
                Email must be your student crimson email address!
            </HelperText>
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={{ width: 350 }}
            />
            <TextInput
                label="Confirm Password"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry={true}
                style={{ width: 350 }}
            />
            <HelperText type="error" visible={!passwordsMatch}>
                Passwords must match!
            </HelperText>
            <Button mode="contained" onPress={onCreatePress}>
                Create
            </Button>
        </AuthPage>
    )
}

export default CreateAccount
