// const webpack = require('webpack');

const config = {
	context: __dirname + '/src',
	entry: {
		app: './main.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}
		}]
	}
}
console.log(config.context);
module.exports = config;
