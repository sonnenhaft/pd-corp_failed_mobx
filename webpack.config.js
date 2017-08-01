require('dotenv').config({ path: `.env.${ [process.env.NODE_ENV] }` })

const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const devServerPort = process.env.DEV_SERVER_PORT

const pkg = require('./package.json')
process.env.VERSION = pkg.version

function copyEnvVars() {
  const vars = Array.prototype.slice.call(arguments)
  return vars.reduce((e, v) => {
    e[`process.env.${ v }`] = JSON.stringify(process.env[v])
    return e
  }, {})
}

const paths = {
  src: path.join(__dirname, 'src'),
  html: path.join(__dirname, 'src/index.html'),
  dist: path.join(__dirname, 'dist'),
  node_modules: path.join(__dirname, 'node_modules')
}

const coreCssRules = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
      sourceMap: true,
      localIdentName: '[local]___[hash:base64:5]'
    }
  },
  {
    loader: 'postcss-loader', options: {
    config: {
      path: './postcss.config.js'
    }
  }
  }
]

const coreScssRules = [
  ...[coreCssRules[0]],
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  }
]

const common = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [paths.src, 'node_modules']
  },
  output: {
    path: paths.dist,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
        exclude: paths.node_modules
      },
      { test: /\.mp3$/, loader: 'file-loader' },
      { test: /\.svg$/, use: [{ loader: 'raw-loader' }] },
      // { test: /\.eot$/, use: [{ loader: 'raw-loader' }] },
      {
        test: /\.(ttf|otf|eot|woff|woff2?)(\?[a-z0-9]+)?$/,
        use: [{ loader: 'file-loader?name=fonts/[name].[ext]' }],
        // use: [{ loader: 'raw-loader' }]
      },

      { test: /\.(png|gif)(\?.*)?$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: paths.html }),
    require('copy-webpack-plugin')([
      { from: 'node_modules/material-design-icons-iconfont/dist/fonts', to: 'fonts/' },
      { from: 'node_modules/font-awesome/fonts', to: 'fonts/' },
      { from: 'node_modules/font-awesome/css', to: 'css/' },
      { from: 'node_modules/normalize.css/normalize.css', to: 'css/normalize.css' }
    ]),
    new webpack.DefinePlugin(copyEnvVars(
      'NODE_ENV',
      // 'BACKEND_HOST',
      // 'BACKEND_PORT',
      'VERSION'
    ))
  ]
}

const development = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${ devServerPort }`,
    'webpack/hot/only-dev-server',
    paths.src
  ],
  devtool: 'cheap-eval-source-map',
  // devtool: 'source-map',
  devServer: {
    hot: true,
    //stats: 'errors-only',
    //quiet: true,
    host: process.env.HOST,
    port: devServerPort
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', ...coreScssRules],
        include: paths.src
      },
      {
        test: /\.css$/,
        use: ['style-loader', ...coreCssRules],
        include: [paths.src, paths.node_modules]
      }
    ]
  },
  performance: { hints: false },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin({ port: 9001 })
  ]
}

const production = {
  bail: true,
  entry: {
    app: paths.src
  },
  devtool: 'source-map',
  output: {
    path: paths.dist,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({ loader: [...coreScssRules] }),
        include: paths.src
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ loader: [...coreCssRules] }),
        include: [paths.src, paths.node_modules]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new CleanPlugin([paths.dist]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: function (module) {
        if ( typeof module.context === 'string' ) {
          return module.context.indexOf('node_modules') !== -1
        } else {
          return false
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ]
}

const getEnv = () => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const buildDev = process.env.BUILD_DEV === 'true'
  const noBuild = process.env.NO_BUILD === 'true'

  if ( (isDevelopment && !buildDev) || noBuild ) {
    return development
  } else {
    return production
  }
}

module.exports = merge(common, getEnv())
