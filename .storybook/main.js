const path = require('path');

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-docs',
    // TODO Ждём пока снова заработает на версии сторибука 8.5 или выше
    // '@storybook/addon-storysource',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    "@storybook/addon-viewport",
    "@storybook/preview-api",
    "@storybook/manager-api",
    "@storybook/test",
  ],
  
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  
  webpackFinal: async config => {
    // Добавляем исключение на обработку svg'шек базовым загрузчиком
    const svgRule = config.module.rules.find(({ test }) => String(test).includes('svg'));
    svgRule.test = /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|cur|ani|pdf)(\?.*)?$/;

    // Добавил из нашего вебпака обработчик less, svg и шрифтовой загрузчик
    config.module.rules.push.apply(config.module.rules, [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'always', // всегда вычислять деление как арифметику
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ])

    // диспетчерируем расширени
    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx', '.less');
    config.resolve.alias = {
      assets: path.resolve(__dirname, '../src/assets'),
      svg: path.resolve(__dirname, '../src/assets/svg'),
      css: path.resolve(__dirname, '../src/assets/css'),
    }

    // и определяем точки входа
    config.resolve.modules = [path.resolve(__dirname, '../src'), 'node_modules']

    return config;
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  }
}