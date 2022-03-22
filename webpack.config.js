/**
 * Created  @date 2022/3/22 21:21
 * @author zh_elk
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(img|png|gif)$/,
                loader: 'url-loader',
            },{
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]

}