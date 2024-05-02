module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@constants': './src/constants',
            '@services': './src/services',
            '@providers': './src/providers',
            '@utils': './src/utils',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  }
}
