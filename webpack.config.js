const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode:"development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist', //告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Progressive Web Application'
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助 ServiceWorkers 快速启用
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
        // new webpack.NamedModulesPlugin(), //开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
        // new webpack.HotModuleReplacementPlugin(), //模块热替换

    ],
    optimization: {
        splitChunks: { 
            chunks: "initial", 
            cacheGroups: {
                priority: "0", 
                vendor: {
                    chunks: "initial",
                    test: /react|lodash/, 
                    name: "vendor",
                    minSize: 0,
                    minChunks: 1,
                    enforce: true,
                    reuseExistingChunk: true   // 可设置是否重用已用chunk 不再创建新的chunk
                }
            }    
        }
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
}