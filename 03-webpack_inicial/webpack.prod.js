const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    mode: 'production',

    output: {
        clean: true,
        assetModuleFilename: '[name][ext]',
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            },
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin(),]
    },

    plugins: [
        new HtmlWebPackPlugin({
            title: 'Mi Webpack App',
            filename: 'index.html',
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: true
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/assets", to: "assets/" },
            ]
        })
    ]
}