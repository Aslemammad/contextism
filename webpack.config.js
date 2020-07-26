const webpack = require('webpack');
const path = require('path');
const packageJson = require('./package.json');

// constiables
const sourcePath = path.join(__dirname, './example');
const outPath = path.join(__dirname, './build');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context   : sourcePath,
	mode      : 'development',
	entry     : {
		app : './index.js'
	},
	output    : {
		path     : outPath,
		filename : 'bundle.js'
	},
	target    : 'web',
	resolve   : {
		extensions : [
			'.js',
			'.ts',
			'.tsx'
		],
		// Fix webpack's default behavior to not load packages with jsnext:main module
		// (jsnext:main directs not usually distributable es6 format, but es6 sources)
		mainFields : [
			'module',
			'browser',
			'main'
		]
	},
	module    : {
		rules : [
			// .ts, .tsx
			{
				test : /\.tsx?$/,
				use  : [
					{
						loader : 'babel-loader'
					},
					'ts-loader'
				].filter(Boolean)
			},
			{
				test    : /\.js$/,
				loader  : 'babel-loader',
				exclude : /node_modules/
			},
			// css

			// static assets
			// { test: /\.html$/, use: 'html-loader' },
			{ test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
			{
				test : /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
				use  : 'file-loader'
			}
		]
	},

	plugins   : [
		new webpack.EnvironmentPlugin({
			NODE_ENV : 'development', // use 'development' unless process.env.NODE_ENV is defined
			DEBUG    : true,
			API_URL  : 'http://127.0.0.1:8080'
		}),
		new HtmlWebpackPlugin({
			template : 'index.html',

			append   : {
				head : `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`
			},
			meta     : {
				title       : packageJson.name,
				description : packageJson.description,
				keywords    : Array.isArray(packageJson.keywords) ? packageJson.keywords.join(',') : undefined
			}
		})
	],
	devServer : {
		contentBase        : sourcePath,
		hot                : true,
		inline             : true,
		historyApiFallback : {
			disableDotRule : true
		},
		stats              : 'minimal',
		clientLogLevel     : 'warning'
	},

	// https://webpack.js.org/configuration/devtool/
	devtool   : 'cheap-module-eval-source-map',
	node      : {
		// workaround for webpack-dev-server issue
		// https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
		fs  : 'empty',
		net : 'empty'
	}
};
