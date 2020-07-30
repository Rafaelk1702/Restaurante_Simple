const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackplugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/'
},
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
        /*exclude: file => (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
          )*/
      },
     /* {
       test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }},*/
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        exclude: file => (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
          ),
          
        use: {
          loader: 'vue-loader'
        }
      },

      
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader?name=images/[name].[ext]', //se puede usar url-loader
            options: {
              //name: '[sha512:hash:base64:7].[ext]',
              //name :'img/[hash]-[name].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
      test: /\.(png|jpe?g|gif)$/i,
      exclude: /node_modules/,
      use: [
        {
          loader: 'url-loader', 
        },
      ],
    },
     /* {
        test: /\.(html)$/i,
        loader: 'html-loader',
        exclude: /node_modules/
     },*/
      
     {test: /\.css$/, use:['style-loader','css-loader']},//配置处理.css文件的第三方处理规则
      
      {test: /\.scss$/, use: ["style-loader",'css-loader','sass-loader']},
   //   {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: {loader: "url-loader",            options: {
     //   esModule: false,
     // },}},
      {test: /\.(tff|eot|svg|woff|woff2)$/, use: {loader: "url-loader",            options: {
        esModule: false,
      },}}, 
    ]
  },
 /* devServer: {
    historyApiFallback: true,
    port: 8081,   // you can change the port there
    noInfo: true,
    overlay: true
    },*/
  resolve: {
    extensions: ['.js', '.jsx']
  },
  
  plugins: [
    new htmlWebpackplugin({ //创建一个在内存中生成的html页面的插件
        template: path.join(__dirname, './public/index.html'),
        filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ]

};