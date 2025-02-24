export const clearRouterStack = (path, navigation) => {
    if (path === '/') {
        navigation.reset({
            index: 0,
            routes: [{ name: 'index' }]
        })
        return
    }
    // Remove leading slash because this routes based on name and not path
    let routeName = path
    if (path[0] === '/') {
        routeName = path.slice(1)
    }
    navigation.reset({
        index: 0,
        routes: [{ name: routeName }]
    })
}
