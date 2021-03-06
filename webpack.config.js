/*
 * @Author: dongnan
 * @Descripttion: webpack配置
 * @Date: 2020-08-09 22:38:41
 */
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // 配置 dev-server 命令参数
    devServer: {
        open: true,
        port: 3000,
        contentBase: 'src',
        hot: true
    },
    //所有webpack 插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    //配置第三方loader模块
    module: {
        //第三方模块的匹配规则
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2|otf)$/,
                use: 'url-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "env"
                    ],
                    "plugins": [["component", [
                        {
                            "libraryName": "mint-ui",
                            "style": true
                        }
                    ]]]
                }
            }

        ]
    }
}