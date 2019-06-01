/*
1、Buffer（缓冲区）
三种实例化方式：
1、var buf1=new Buffer(size);//创建指定容量的缓冲区
2、var buf2=new Buffer(array);//基于数组创建缓冲区
3、var buf3=new Buffer(str,[encoding]);//基于字符串创建缓冲区，可选参数[encoding]，指定编码。
七种encoding：utf8、ascii、utf16le、ucs2、base64、binary、hex
四个类方法：
Buffer.isEncoding(encoding);//判断传入参数是否是支持的编码
Buffer.isBuffer(obj);//判断obj对象是否的是Buffer对象
Buffer.byteLength(string,[encoding]=‘utf8’);//输出字符串的字节长度，可选[encoding]设置编码
Buffer.concat(list<Buffer>,[length]);//将Buffer列表(数组)连接起来，可选[length]设置结果buffer的长度。注：长度不够将错误targetStart out of bounds
 */
//创建指定buffer;
var buf1 =new Buffer(10);console.log(buf1);
//根据数组创建
var buf2=new Buffer([1,2,3,4,5,6]);console.log(buf2);
//根据字符串创建 第二个参数为字符编码
var buf3=new Buffer("123456");console.log("???",buf3);
buf3=new Buffer("123456","utf-8");console.log("utf-8",buf3);
buf3=new Buffer("123456","ascii");console.log("ascii",buf3);
buf3=new Buffer("123456","utf16le");console.log("utf16le",buf3);
console.log(Buffer.isEncoding("ascii"));//判断编码是否被支持
console.log(Buffer.isBuffer(buf3));//判断对象是否是buffer的实例
//获取buffer的字节长度,与编码有关
console.log(Buffer.byteLength("String",'hex'));
//连接buffer,可选参数为最大长度
console.log("buf1.length=%s",buf1.length);
console.log(Buffer.concat([buf1,buf2,buf3],2));//第二个好像是长度,可不传
//将字符串写入buffer
buf1.write("String:buf1",0,8,'utf8');
console.log(buf1);
console.log(buf1.toString());
console.log(buf1.toString('ascii',0,3));
//toJson 将缓冲区数据转换为JSON
//console.log(buf1.toJSON());
//buffer复制

var buf4=new Buffer(10);
var buf5=new Buffer("String",'utf8');
console.log(buf4);
console.log(buf5);
buf5.copy(buf4,2,1,3);//2是buf4的起点,1是buf5的起点,3是buf5的终点(不含3)=>将buf5从第一位开始第三位结束,复制到buf4上,buf4从第二位开始存储
console.log(buf4);
console.log(buf5);
console.log(buf4.toString());//tr
console.log(buf4[2]);//可以当数组使用

