const fs = require('fs');
const path = require('path');
const dataSource = path.resolve(__dirname, './data.json');

const getData = function() {
    const data = fs.readFileSync(dataSource, 'utf-8');
    return JSON.parse(data);
}

const putData = function(data) {
    fs.writeFileSync(dataSource, JSON.stringify(data), 'utf-8')
}

module.exports = {
    getData, putData
}