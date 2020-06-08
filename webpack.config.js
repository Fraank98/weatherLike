const path = require ("path")
const Dotenv = require('dotenv-webpack');


module.exports = {
    mode : "development",
    entry : {
        app: "./src/index.js", 
        weather: "./src/weather.js"
    }, 
    output : {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new Dotenv()
    ]
}