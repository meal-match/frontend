import { StackActions } from '@react-navigation/native'
import { router, useNavigationContainerRef } from 'expo-router'

export const clearRouterStack = (path) => {
    const rootNavigation = useNavigationContainerRef()
    if (rootNavigation.canGoBack()) {
        rootNavigation.dispatch(StackActions.popToTop())
    }
    router.replace(path)
}
