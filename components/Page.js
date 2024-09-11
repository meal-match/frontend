import React from 'react'
import { node } from 'prop-types'
import { Redirect, useRootNavigationState } from 'expo-router'
import { useSelector } from 'react-redux'

import { selectIsLoggedIn } from '@store'
import Container from '@components/Container'

const Page = ({ children }) => {
    const rootNavigationState = useRootNavigationState()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!rootNavigationState?.key) {
        return null
    }

    if (!isLoggedIn) {
        return <Redirect href="auth/login" />
    }

    return <Container>{children}</Container>
}

Page.propTypes = {
    children: node.isRequired
}

export default Page
