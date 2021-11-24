const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'front-components.js',
        library: 'frontComponents',
        libraryTarget: 'umd',
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
        alias: {
            assets: path.resolve(__dirname, 'src/assets'),
            svg: path.resolve(__dirname, 'src/assets/svg'),
            css: path.resolve(__dirname, 'src/assets/css'),
            tpIcons: path.resolve(__dirname, 'src/assets/icons'),
        },
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
    },
    module: {
        rules: [
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
        ],
    },
};
