const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const config = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath)
    },
    resolve: {
        alias: {
            Helpers: path.resolve(__dirname, 'src/app/helpers'),
            Images: path.resolve(__dirname, 'src/public/images')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: [/\.ico$/, /\.mp3$/],
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                    /\.ico$/
                ],
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [
                            require('babel-plugin-transform-object-rest-spread')
                        ]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },

            {
                // Match woff2 in addition to patterns like .woff?v=1.1.1.
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                  loader: "url-loader",
                  options: {
                    // Limit at 50k. Above that it emits separate files
                    limit: 50000,

                    // url-loader sets mimetype if it's passed.
                    // Without this it derives it from the file extension
                    mimetype: "application/font-woff",

                    // Output below fonts directory
                    name: "/static/media/[name].[ext]",
                  }
                },
              },
        ]
    },
    devtool: isProd ? 'source-map' : 'cheap-eval-source-map',
    plugins: [
        new ExtractTextPlugin('static/css/styles.css'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/public/index.html'),
            inject: 'body',
            minify: isProd
                ? {
                      removeComments: true,
                      collapseWhitespace: true,
                      removeRedundantAttributes: true,
                      useShortDoctype: true,
                      removeEmptyAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      keepClosingSlash: true,
                      minifyJS: true,
                      minifyCSS: true,
                      minifyURLs: true
                  }
                : {}
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json'
        }),

    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    port: 3000,
    disableHostCheck: true
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

if (isProd) {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    );
    config.plugins.push(
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

module.exports = config;
