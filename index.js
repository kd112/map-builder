const express = require('express');
const app = express();
let proxy = require('http-proxy-middleware');

app.use(express.static(__dirname + "/public"));

app.use('/proxy',proxy({
    target:" ",
    toProxy:true,
    pathRewrite:(path,req)=>{
        return ""
    },
    router:(req)=>{
        console.log(req.query.source)
        return decodeURIComponent(req.query.source)
    }
}))

app.listen(3000,()=>{
    console.log("running on port 3000")
})