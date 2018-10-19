const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path");

const server_dev =
{
    mode: "development",
    target: "node",
    entry: "./src/game/server/Server.ts",
    devtool: "inline-source-map",

    module: 
    {
        rules:
        [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve:
    {
        extensions: [ '.tsx', '.ts', '.js' ],
    },

    output: 
    {
        libraryTarget: "umd",
        filename: 'server.js',
        path: path.resolve(__dirname, 'build/')
    }
};

const client_dev =
{
    mode: "development",
    target: "web",
    entry: "./src/game/client/Client.ts",
    devtool: "inline-source-map",

    module: 
    {
        rules:
        [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve:
    {
        extensions: [ '.tsx', '.ts', '.js' ],

    },

    output: 
    {
        libraryTarget: "umd",
        filename: 'client.js',
        path: path.resolve(__dirname, 'build/static')
    },

    plugins: 
    [
        new CopyWebpackPlugin([
            {from:"src/web/",to:''} 
        ]), 
    ]
};


module.exports = [server_dev,client_dev]