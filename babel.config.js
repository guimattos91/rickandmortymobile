module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv"],
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            components: './src/components',
            config: './src/config',
            context: './src/context',
            env: './src/env',
            helpers: './src/helpers',
            hooks: './src/hooks',
            routes: './src/routes',
            screens: './src/screens',
            services: './src/services',
            theme: './src/theme',
            types: './src/types',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
        },
      ],
    ],
  };
};
