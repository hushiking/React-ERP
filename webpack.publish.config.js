var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'app/index.jsx'),
		vendors: ['react', 'react-dom', 'react-router', 'jquery', 'moment', 'antd']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[chunkhash:8].js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/, // 用正则表达式匹配文件路径
				loader: 'babel-loader', // 加载模块babel,它是babel-loader的缩写
				exclude: /node_modules/ // 排除 node_modules 里面的文件
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			/* {
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			}, */
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'url-loader?limit=25000&name=images/[name].[ext]'
			},
			{
				test: /\.(eot|woff|ttf|woff2|svg)$/,
				loader: 'url-loader?limit=100000&fonts/[name].[ext]'
			}
		]
	},
	plugins: [
		// 构建之前先删除dist文件
		new CleanWebpackPlugin(['dist']),
		// 分离第三方应用插件,name属性会自动指向entry中vendors属性,filename属性中的文件会自动构建到output中的
		new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'js/[name].[chunkhash:8].js'}),
		// 用webpack压缩js代码,可以忽略代码中的警告
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		// 可以新建多个抽离样式的文件,这样就可以有多个css文件了
		new ExtractTextPlugin('css/[name].[chunkhash:8].css'),
		// 根据模板生成html并编译我们最终的有用代码
		new HtmlWebpackPlugin({
			template: './app/index.html',
			htmlWebpackPlugin: {
				/* 'files': {
					'css': ['app.css'],
					'js': ['vendors.js', 'bundle.js']
				}, */
				// 效果不大,情怀至上
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true
				}
			}
		}),
		// 定义生产环境的插件,process代表node中的进程,它有一个env属性,将其定义为production,会自动帮你优化js代码
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"' // production必须要双引号!!!
			}
		})
	]
}