const path = require( "path" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );

const plugins = [
    new ExtractTextPlugin( {
        filename: "../css/[name].bundle.css"
    } )
];

module.exports = {
    entry: path.resolve( __dirname, "src/index" ),
    output: {
        path: path.resolve( __dirname, "public/js" ),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract( {
                    use: [ {
                        loader: "css-loader",
                        options: {
                            url: false,
                            autoprefixer: false,
                            minimize: true
                            // sourceMap: true
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            // sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            // sourceMap: true,
                            includePaths: [ "styles" ]
                        }
                    } ],
                    fallback: "style-loader"
                } )
            }
        ]
    },
    plugins
};
