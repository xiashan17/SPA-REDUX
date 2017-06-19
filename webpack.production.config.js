// 该配置基于webpack2.0 详情查看 https://webpack.js.org/guides/migrating/
const path = require('path'); // 导入路径包
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件


module.exports = {
    entry: './src/index.js', //入口文件
    output: {
        path: path.resolve(__dirname, 'build'), // 指定打包之后的文件夹
　　　　 // publicPath: '/assets/', // 指定资源文件引用的目录，也就是说用/assests/这个路径指代path，开启这个配置的话，index.html中应该要引用的路径全部改为'/assets/...'
        // filename: 'bundle.js' // 指定打包为一个文件 bundle.js
        filename: '[name]-[hash].js' // 可以打包为多个文件
    },
    // 使用loader模块
    module: {
        /* 在webpack2.0版本已经将 module.loaders 改为 module.rules 为了兼容性考虑以前的声明方法任然可用，
　　　　　　同时链式loader(用!连接)只适用于module.loader，
　　　　　　同时-loader不可省略 */
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader', {
                    loader: 'css-loader',
                    options: {
                        // modules: true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
                    }
                }
            ]
        }, {
            test: /\.(jsx$|js)$/,
            loader: 'babel-loader', //此处不能用use，不知道为啥
            exclude: /(node_modules|bower_components)/, //需要排除的目录
            include: __dirname
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html' // 模版文件
        }),
        new CleanPlugin(['build']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors' // 将公共模块提取，生成名为`vendors`的chunk
        }),
        new webpack.optimize.UglifyJsPlugin({ //压缩js代码
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name]-[hash].css'),
        //定义环境变量production,定义后就不不把提示的东西打包进去
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}
        })
    ]
}