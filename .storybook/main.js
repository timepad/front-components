const path = require('path');

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    "@storybook/addon-viewport",
    "@storybook/addon-storysource",
  ],

  // According to issue
  // https://github.com/styleguidist/react-docgen-typescript/issues/356#issuecomment-857887751
  typescript: {
    reactDocgen: 'react-docgen',
  },

  webpackFinal: async config => {
    // Добавляем исключение на обработку svg'шек базовым загрузчиком
    const svgRule = config.module.rules.find(({ test }) => String(test).includes('svg'));
    svgRule.test = /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|cur|ani|pdf)(\?.*)?$/;

    // prevent error on require 'fs', 'net', 'tls'
    config.node = {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    };

    // Добавил из нашего вебпака обработчик less, svg и шрифтовой загрузчик
    config.module.rules.push.apply(config.module.rules, [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
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
}