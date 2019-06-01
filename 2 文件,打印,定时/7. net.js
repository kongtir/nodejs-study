/*
net模块提供了一个异步网络包装，包含了创
建服务器和客户端的方法。
创建服务器:net.createServer([options],[connectionListener])
创建客户端:net.connect(options,[connectionListener])
	   net.createConnection(options,[connectionListener])
net的实例方法：isIP(ipStr),isIPv6(ipStr),isIPv4(ipStr)

 */
var net =require('net');
//创建TCP服务器
net.createServer({allowHalfOpen:false},function (socket) {
    console.log("连接成功!");
    socket.on("end",function () {
        console.log("连接关闭");
    });
    socket.write("您已连接成功服务器");
    socket.pipe(socket);

}).listen(8081,function () {
    console.log('服务器已启动');
});
//客户端连接服务器
var socket = net.connect(8081);
socket.on("data",function (data) {
    console.log("已收到数据:\"%s\"",data.toString());
});
socket.end();
//实例方法
console.log(net.isIP('192.168.1.1'));//返回4
console.log(net.isIP('192.168.1.1666'));//返回0
console.log(net.isIP('fe80::fdda:8afd:d81e:8124%7'));//返回6
console.log(net.isIPv6('fe80::fdda:8afd:d81e:8124%7'));//true
console.log(net.isIPv6('192.168.1.1'));//false