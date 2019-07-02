const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const nodeEnv = 'production';
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const theme = require('../assets/css/theme');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    mode: 'production',
    entry: {
        index: ['./src/containers/index.js']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/rms/res/',
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].chunk.[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'awesome-typescript-loader',]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=babel'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[local]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: theme,
                            javascriptEnabled: true,
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                use: 'file-loader?limit=5000&name=font/font.[name].[ext]'
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: 'url-loader?limit=5000&name=images/[name].[ext]'
            }

        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    ie8: false,
                    ecma: 8,
                    mangle: true,
                    output: { comments: false },
                    compress: { drop_console: false }
                },
                sourceMap: false,
                cache: true,
                parallel: os.cpus().length * 2
            }),
            new OptimizeCSSPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    safe: true,
                    mergeLonghand: false,
                    autoprefixer: { disable: true }
                },
                canPrint: true
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {//node_modules内的依赖库
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor'
                },
                styles: {
                    name: 'styles',
                    test: /(\.css|\.less)$/,
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        }),
        new CheckerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv),
                NODE_LOCATION: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:10].css',
            chunkFilename: 'css/[name].[contenthash:10].css'
        }),
        new HtmlWebpackPlugin({
            title: '彩贝壳后台管理系统',
            template: './src/containers/index.html',
            filename: 'index.html'
        })
    ],
    resolve: {
        mainFiles: ['index.web', 'index'],// 这里哦
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.less', '.css'],
        alias: {
            '@base': path.resolve(__dirname, '../'),
            '@': path.resolve(__dirname, '../src/'),
            '~': path.resolve(__dirname, '../assets/'),
            assets: path.resolve(__dirname, '../assets/')
        }
    },
    performance: {
        hints: false
    }
};
