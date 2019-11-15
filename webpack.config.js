const IS_DEV = process.env.NODE_ENV === 'development'
if ( IS_DEV ) {
  require('dotenv').config({ path: `.env.${ [process.env.NODE_ENV] }` })
}

const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const paths = {
  src: path.join(__dirname, 'src'),
  html: path.join(__dirname, 'src/index.html'),
  dist: path.join(__dirname, 'dist'),
  node_modules: path.join(__dirname, 'node_modules')
}

const cssHelper = arr => {
  if ( IS_DEV ) {
    return ['style-loader', ...arr]
  } else {
    return ExtractTextPlugin.extract({ use: [...arr] })
  }
}

const common = {
  devtool: IS_DEV ? 'cheap-eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [paths.src, 'node_modules']
  },
  output: IS_DEV ? {
    path: paths.dist,
    filename: '[name].js'
  } : {
    path: paths.dist,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
        exclude: paths.node_modules
      },
      { test: /\.svg$/, use: [{ loader: 'raw-loader' }] },
      { test: /\.(png|gif)(\?.*)?$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.css$/,
        use: cssHelper([
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]',
              minimize: process.env.NODE_ENV === 'production'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]),
        include: [paths.src, paths.node_modules]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: paths.html }),
    require('copy-webpack-plugin')([
      {
        from: 'node_modules/material-design-icons-iconfont/dist/fonts',
        to: 'fonts/',
        ignore: ['*.js', '*.md', 'codepoints', '*.ijmap']
      },
      { from: 'node_modules/normalize.css/normalize.css', to: 'css/normalize.css' },
      { from: 'node_modules/rc-tooltip/assets/bootstrap_white.css', to: 'css/rc-tooltip.css' },
      { from: 'node_modules/roboto-fontface/css/roboto/roboto-fontface.css', to: 'css/roboto/roboto.css' },
      { from: 'node_modules/roboto-fontface/fonts/roboto/', to: 'fonts/roboto/' }
    ])
  ]
}

const development = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${ process.env.DEV_SERVER_PORT }`,
    'webpack/hot/only-dev-server',
    paths.src
  ],
  devServer: {
    hot: true,
    stats: {
      chunks: false,
      assets: false,
      hash: false,
      modules: false,
      moduleTrace: false
    },
    proxy: {
      '/api/**': {
        target: process.env.API_URL,
        secure: false,
        changeOrigin: true
      }
    },
    port: process.env.DEV_SERVER_PORT
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

const production = {
  entry: { app: paths.src },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new CleanPlugin([paths.dist]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: module => {
        if ( typeof module.context === 'string' ) {
          return module.context.includes('node_modules')
        } else {
          return false
        }
      }
    })
  ]
}

module.exports = merge(common, IS_DEV ? development : production)
