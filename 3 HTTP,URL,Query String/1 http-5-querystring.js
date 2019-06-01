var querystring = require("querystring");
var queryStr ='a=1&b=2';
//parse (str,[分隔符],[连接符],[options])
var queryObj=querystring.parse(queryStr);//第二个参数设置的分割符号 .parse(queryStr,'|');,第三个是等号的定义,第四个{maxkeys:1}
console.log(queryObj);
//stringfy(obj,[分隔符],[连接符])
queryStr=querystring.stringify(queryObj,'@',':');//后两个不传转换为标准的
console.log(queryStr);
