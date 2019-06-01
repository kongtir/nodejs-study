var fs=require('fs');
var path = require('path');
function consoleFiles(dir) {
    var files =fs.readdirSync(dir);//这里返回了许多相对路径
    files.forEach(function (name) {
        console.log("name:",name);
        var pathname = path.join(dir,name);
        if(fs.statSync(pathname).isDirectory()){
            consoleFiles(pathname);
            console.log("dir:\t",pathname);
        }else{
            console.log("file:\t",pathname);
        }
    })
}
consoleFiles("../");//递归获取文件夹内容