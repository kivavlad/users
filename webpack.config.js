const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (
  env = { NODE_ENV: process.env.NODE_ENV || 'development' }
) => {
  const isProduction = env.NODE_ENV === 'production';
  const mode = isProduction ? 'production' : 'development';

  return {
    mode,
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: 'auto',
    },
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      port: 3000,
      hot: true,
      open: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        '@app': path.resolve(__dirname, 'src/app'),
        '@entities': path.resolve(__dirname, 'src/entities'),
        '@features': path.resolve(__dirname, 'src/features'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@shared': path.resolve(__dirname, 'src/shared'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
      }),
    ],
  };
};