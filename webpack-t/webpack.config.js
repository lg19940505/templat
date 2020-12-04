//首先引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path= require('path')
module.exports={
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), //必须是绝对路径
        filename: 'bundle.[hash].js',
        publicPath: '/' //通常是CDN地址
    },
    mode:'development',
    devtool: 'cheap-module-eval-source-map' ,//开发环境下使用
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          },
          {
              test: /\.(sc|c)ss$/,
              exclude: /node_modules/,
              use: ['style-loader', 'css-loader', {
                loader: 'postcss-loader',
              
            }, 'sass-loader']
          },
          {
            test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10240, //10K
                        esModule: false 
                    }
                }
            ],
            exclude: /node_modules/
        },
        {
            test: /.html$/,
            use: 'html-withimg-loader'
        }
        ]
      },
      devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true ,//是否启用 gzip 压缩
       
    },
  
    plugins:[
         //数组 放着所有的webpack插件
         new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            // hash: true //是否加上hash，默认是 false
        }) ,
         //不需要传参数喔，它可以找到 outputPath
         new CleanWebpackPlugin()     
    ]  
}