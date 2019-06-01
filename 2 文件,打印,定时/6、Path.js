/*
方法	描述
path.normalize(p)	路径标准化
path.join([path1],[path2])	组合参数中的所有路径，返回规范化后的路径
resolve([from ...], to)	将to解析为绝对路径
relative(from, to)	返回从from到to的相对路径
dirname(p)	返回指定路径的上级路径
basename(p, [ext])	返回路径中的最后一部分
extname(p)	返回p的扩展名
unlink(string,callback)	用于删除文件
mkdir(path,[mode],callback)	创建文件夹
 */
var path = require('path');
var p='https://www.baidu.com';
console.log(path.normalize(p));//路径标准化
console.log(path.join(p,'abc','../ab'));//组合参数中的所有路径，返回规范化后的路径
console.log(path.resolve("./"));//相对路径换成绝对路径
console.log(path.dirname(path.resolve("./")));//上级文件夹
console.log(path.basename(path.resolve("./")));//路径的最后一部分
console.log(path.extname(p));//文件扩展名称
console.log(path.sep);//常量 \    特定平台的文件分隔工具. '\\' 或者 '/'.
console.log(path.delimiter);//常量 ;  特定平台的路径分隔符, ; 或者 ':'.

