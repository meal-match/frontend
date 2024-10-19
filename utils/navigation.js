import { StackActions } from '@react-navigation/native'
import { router, useNavigationContainerRef } from 'expo-router'
export const clearRouterStack = (path) => {
    const rootNavigation = useNavigationContainerRef()
    rootNavigation.dispatch(StackActions.popToTop())
    router.replace(path)
}
