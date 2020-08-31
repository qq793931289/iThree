const path = require('path')
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    // "index": ['./samples/components.js'],
    "index": ['./src/index.tsx']
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `assets/[hash:8].[name].js`,
    publicPath: '',
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: true,
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: "demo.tsconfig.json"
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: 'style-loader!fast-css-loader!fast-sass-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot|mp4)$/,
        loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, "src/")
        ],
        use: [{
          loader: 'svg-sprite-loader',
          options: {
            symbolId: '[name].[hash:4]',
            extract: false,
            spriteFilename: svgPath => `assets/sprite.[hash:8]${svgPath.substr(-4)}`
          }
        }]
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: 'samples/index.html',
      template: 'index.html',
    }),
    // new SpriteLoaderPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: 'samples/favicon.ico',
    //     to: 'favicon.ico',
    //     toType: 'file',
    //   }
    // ])
  ]
}