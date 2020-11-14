#!/usr/bin/env node

const yargs = require('yargs');
const mfs = require('./fs');
const fs = require('fs');
const path = require('path');

yargs
    .scriptName('cw')
    .command('make [name]', 'create new [data, view, script, style] files', 
    yargs => {
        yargs.positional('name', {
            type: 'string',
            required: true,
            describe: 'pass the name by which you want to create the files'
        })
    }, createStruchture)
    .argv;


function createStruchture({ name }) {
    let data = mfs.getData();
    if(data.files.indexOf(name) === -1) {
        if(createFiles(name)) {
            data.files.push(name);
            mfs.putData(data);
            console.log('file created sucessfully')
        } else {
            console.error('File already exists')
        }
    } else {
        console.warn('File exists in local db')
    }
}

function getTemplates() {
    const names = ['data', 'view', 'scss', 'js'];
    const data = {};
    names.forEach(name => data[name] = fs.readFileSync(path.resolve(__dirname, `./templates/${name}.txt`)));
    return data;
}

function createFiles(name) {
    const paths = {
        data: path.resolve(__dirname, `./../data/${name}.js`),
        view: path.resolve(__dirname, `./../views/${name}.pug`),
        scss: path.resolve(__dirname, `./../src/scss/${name}.scss`),
        js: path.resolve(__dirname, `./../src/${name}.js`)
    }

    const templates = getTemplates();

    if(!checkIfExists(name)) {
        Object.keys(paths).forEach(it => fs.writeFileSync(paths[it], templates[it], 'utf-8'))
    } else return false;
    return true;
}

function checkIfExists(name) {
    return  fs.existsSync(path.resolve(__dirname, `./../data/${name}.js`)) &&
            fs.existsSync(path.resolve(__dirname, `./../views/${name}.pug`)) &&
            fs.existsSync(path.resolve(__dirname, `./../src/scss/${name}.scss`)) &&
            fs.existsSync(path.resolve(__dirname, `./../src/${name}.js`));
}