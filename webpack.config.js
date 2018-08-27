const path = require('path');


module.exports ={
    mode:'development',
    entry:'./map-builder/index.js',
    output:{
        path:path.resolve(__dirname,'public'),
        filename:"webpack-bundle.js"
    }
}