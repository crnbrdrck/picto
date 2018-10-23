
const path = require('path')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

const server_dev = {
  mode: "development",
  target: "node",
  entry: "./src/game/server/server.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build/')
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
};

const client_dev = {
  mode: "development",
  target: "web",
  entry: "./src/game/client/client.ts",
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      { // https://vue-loader.vuejs.org/guide/css-modules.html#usage
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              // enable CSS Modules
              modules: true,
              // customize generated class names
              localIdentName: '[local]_[hash:base64:8]'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'build/static')
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),

    new CopyWebpackPlugin([{
        from:"src/game/client/web/index.html", to:''
      }
    ]),

    new CopyWebpackPlugin([{
        from:"src/game/client/web/style.css", to:''
      }
    ]),

    new VueLoaderPlugin()
  ]
};


module.exports = [server_dev, client_dev]
