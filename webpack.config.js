var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    debug: true,
    entry: {
        // app: "./index.js",
        app: "./app/app.js"
    },
    output: {
        path: __dirname,
        publicPath: "/app",
        filename: "[name].bundle.js"
    },
    // module: {
    //     loaders: [{
    //         test: /\.scss$/,
    //         loader: ExtractTextPlugin.extract('css!sass')
    //     }]
    // },
    // plugins: [ new ExtractTextPlugin('./style.css', { allChunks: true }) ]
};
