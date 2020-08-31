const path = require('path')
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
//用于在构建前清除dist目录中的内容
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

//清除dist构建目录文件
// plugins.push(new CleanWebpackPlugin(['dist']));

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  externals: {},
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: '[name].js',
    // filename: 'bundle.js',
    libraryTarget: 'umd',
    library: 'icesium',
    umdNamedDefine: true,
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        query: {
          declaration: true
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
      }
    ]
  },
  performance: {
    hints: false
  },
  externals: [nodeExternals()],
  devtool: '#source-map',
  plugins: [
    // new CleanWebpackPlugin(['lib']),
    // new HtmlWebpackPlugin({
    //   template: 'index.html',
    // }),
  ],
  // devServer: {
  //   contentBase: "./",
  //   historyApiFallback: true,
  //   inline: true,
  //   hot: true
  // }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // module.exports.devtool = false;

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        sourceMap: true,
        compress: {
          warnings: false,
          drop_console: true
        }
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

  ])
}