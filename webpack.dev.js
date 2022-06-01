module.exports = {
	// change to .tsx if necessary
	entry: './src/index.js',
	output: {
		path: __dirname + '/static/js',
		publicPath: '/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		fallback: {
				fs: false,
				path: false
		},
		alias: {
				ejs: 'ejs/ejs.min.js'
		}
	},
	devServer: {
		contentBase: './static/js',
	},
	module: {
		rules: [
			// changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
			{ test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },

			// addition - add source-map support
			{ enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
		]
	},
	// addition - add source-map support
	devtool: "source-map"
}