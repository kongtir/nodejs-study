var url =require('url');
//将url地址转换为url对象
var urlObj=url.parse('http://c.c.com/p/c/a/s/t'); //?query=string&c=oop#hash值原句加上这个后query不能正常转换
console.log(urlObj);
urlObj.port=8080;//这个似乎没什么作用
urlObj.hash='#hash=none';
urlObj.query={p1:"p1,",p2:[1,2,3,'a5']};
var urlStr = url.format(urlObj);
console.log(urlStr);
//拼接url
console.log(url.resolve("http://www.baidu.com","aa","/bb"))
