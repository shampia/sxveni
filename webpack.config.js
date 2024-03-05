const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let htmlPageNames = ['index'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    inject: 'body',
    scriptLoading: 'module'
  })
});

module.exports = {
    entry: './src/scripts/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                  }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: [
                   path.resolve(__dirname, 'src', 'styles')
                ],
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html',
          inject: 'body',
          scriptLoading: 'module'
        }),
    ].concat(multipleHtmlPlugins)
};
