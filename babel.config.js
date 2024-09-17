// eslint-disable-next-line no-undef
module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        env: {
            production: {
                plugins: ['react-native-paper/babel']
            }
        },
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@components': './components',
                        '@constants': './constants',
                        '@store': './store',
                        '@assets': './assets'
                    }
                }
            ]
        ]
    }
}
