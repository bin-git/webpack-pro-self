let path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');   //  引入html-webpack-plugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 样式表抽离，没搞懂
const devMode = process.env.NODE_ENV !== 'production'; // 判断当前环境是开发环境还是 部署环境，主要是 mode属性的设置值。
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');  //压缩css

// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //引入dist目录清理插件？有错？

module.exports = {
    mode: 'development',            //打包后的模式，有两种：production 默认生产模式   development开发模式
    entry: "./src/js/app.js",       //入口文件
    output: {                      //出口
        filename: 'bundle.js',      // 打包后的文件名，所有依赖模块合并到此
        path: path.resolve(__dirname, 'dist'),  //打包后的路径，必须是一个绝对路径，(__dirname表示以当前目录生成一个打包后的路径，可不写)
    },
    devServer: {                     //开发服务器配置              
        port: 3008,                  //端口号
        progress: true,              //打包时是否出现 进度条
        contentBase: './dist',     // 热跟新目录,启动一个 http://localhost:3003/ 打开指向 dist 目录
        open: true,                  //自动打开浏览器
    },
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) // 添加前缀
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',                  // 打包图片用的url-loader，也可使用file-loader，
                        options: {
                            limit: 8192,                      // 打包css的图片，图片大小小于limit设置的8192B的会转化成base字符串引入，减少请求
                            outputPath: './images/'             //打包后的图片放在指定目录下
                        }
                    }
                ]
            },
            // js处理模块!!!!有问题报错。
            // {
            //     test: /\.js$/,
            //     exclude: /(node_modules)/,  // 加快编译速度，不包含node_modules文件夹内容
            //     use: {
            //         loader: 'babel-loader'
            //     }
            // }


            // 样式表抽离成专门的单独文件并且设置版本号，抽取了样式，就不能再用 style-loader注入到 html 中了。
            // {
            //     test: /\.(sa|sc|c)ss$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'postcss-loader',
            //         'sass-loader'
            //     ]
            // }

        ]
    },
    plugins: [   // 打包需要的各种插件

        new MiniCssExtractPlugin({                                   // 提取样式
            filename: devMode ? '[name].css' : '[name].[hash].css', // 设置最终输出的文件名
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        })

        // new htmlWebpackPlugin({             // 打包HTML
        //     template: './src/index.html'   //  HTML模板路径
        // })
        // new CleanWebpackPlugin(),       //清理dist目录
    ],
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    watch: true   // 监听修改自动打包
}
