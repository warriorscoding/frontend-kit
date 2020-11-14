const fs = require('fs');
const path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin');


const files = {
    global: require(path.resolve(`./data/global.js`))
};

const tmpNames = fs.readdirSync('./data')
const fileNames = tmpNames.filter(name => name != 'global.js').map(name => name.split('.')[0]);

fileNames.forEach(file => {
    files[file] = require(path.resolve(`./data/${file}.js`));
})

const plugins = [];
const entries = {
    global: [path.resolve(`src/global.js`), path.resolve(`src/scss/global.scss`)]
};


// console.log(fileNames);

fileNames.forEach(file => {

    entries[file] = [ 
        path.resolve(`./src/${file}.js`), 
        path.resolve(`./src/scss/${file}.scss`) 
    ]

    plugins.push(
        new htmlWebpackPlugin({
            chunks: files[file].useGlobalChunks ? [file, 'global'] : [file],
            template: `views/${file}.pug`,
            filename: `${file}.html`,
        })
    )
})


// console.log(fileNames);

const pug_html_loader = {
    loader: 'pug-html-loader',
    options: {
        data: files
    }
}

module.exports = { plugins, entries, pug_html_loader };