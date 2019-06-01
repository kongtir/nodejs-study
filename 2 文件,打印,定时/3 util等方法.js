//util
//format 格式化输出
// debug调试输出1og打印字符串，包含时间戳
// inspect 以字符形式打印对象
// isArray 判断数组
// isRegExp判断是否是正则
// isDate 判断日期
// isError 判断是否错误
// inherits??
//提示：util.debug,util.error,util.puts,util.print  已过时
var util =require('2/3 util等方法');
console.log(util.format('%d','ssss'));
//util.debug('debug');
util.log("log");//可以打印时间
console.log(util.inspect({a:3,b:[1,2,3]}));
console.log(util.isArray({a:3,b:[1,2,3]}));
console.log(util.isArray([1,2,3]));
console.log("isDate",util.isDate([1,2,3]));
console.log("isDate",util.isDate(new Date()));
console.log("isDate",util.isDate('02/05/2014'));
console.log(util.isError(0));
console.log("New Error:",util.isError(new Error("New Error")));

console.log(util.isRegExp(/asb/g));
