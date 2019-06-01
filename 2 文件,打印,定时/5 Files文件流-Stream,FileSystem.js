/*
2、Stream（流）
3、FileSystem（文件系统）:fs

appendFile(filename,data,[options],callback)	追加内容到文件
close(fs,callback)	关闭文件
createReadStream(path, [options]) *	创建可读文件流
createWriteStream(path, [options])  *	创建可写文件流
exists(path,callback)	判断文件是否存在
link(srcPath,dstPath,callback)	复制文件
unlink(string,callback)	用于删除文件
mkdir(path,[mode],callback)	创建文件夹
rmdir(path,callback)	删除文件夹
rename(oldPath,newPath,callback)	文件重命名，（不能跨文件夹）
truncate(filePath,callback)	清除文件内容
readdir(path, callback)	读取文件夹内容
readFile(filename, [options], callback)	读取文件内容
watch(filename, [options], [listener])   *	监视文件夹
unwatchFile(filename, [listener])   *	取消监视
watchFile(filename, [options], listener)	监视文件


 */
var fs =require("fs");var fileName = "5 Test.txt";
fs.mkdir("5",function (err,cd) {}); //创建文件夹
fs.rmdirSync("5");//删除文件夹,同步方法可能更早执行
//追加文件:当没有下面两个方法时,可以无限追加.
fs.appendFile(fileName,"appendContent",'utf8',function (err) {
    console.log(err);//,'utf8'可省略
});
//打开和关闭文件
fs.open(fileName,'w',666,function (err,fd) {
    if(err)throw  err;
    //注意关闭时第一个参数是句柄
    fs.close(fd,function (err) {
      if(err)console.log("close:"+err);
    })
});
//创建可读可写流
var rStream =fs.createReadStream(fileName,{bufferSize:200});
var wStream =fs.createWriteStream(fileName,{bufferSize:200});
fs.exists(fileName,function (exists) {
    console.log("文件存在:",exists);
});
console.log("文件存在[同步]:%s",fs.existsSync(fileName));//同步方法
// link 复制文件
fs.link(fileName,"link_"+fileName,function (err) {
    if(err)console.log(err);

});
//可能删除失败,原因是先执行了删除,再执行的复制文件
fs.unlink("link_"+fileName,function (err) {
    if(err)console.log(err);//删除文件
});
fs.rename(fileName,'ReName.txt',function (err) {
    if(err)console.log("Rename:%s",err);//重命名
});
fs.truncate(fileName,function (err) {
    if(err)console.log("truncate:%s",err);
});
fs.readdir("./",function (err,paths) {
    if(err)console.log("ReadDir:%s",err);
    else {
        for (var i=0;i<paths.length;i++){
            console.log("Dir%d:%s",i,paths[i]);
        }
    }
});
fs.readFile("5.txt",function (err,notes) {
    console.log("fileerr:",err);
    console.log("filenotes:",notes.toString());

})