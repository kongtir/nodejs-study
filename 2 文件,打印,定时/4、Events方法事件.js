/*
4、Events方法|描述
addListener/on 注册事件监听器once单次事件监听器注册
removeListener 移除事件监听器removeAllListener 移除所有的事件监听器setMaxListeners 设置最大的事件监听者，默认值为0
listenerCount返回指定事件的监听器数量
 */
var util =require('util'),Emitter=require('events').EventEmitter;
function TestClass() {
    console.log("对象初始化")
}
util.log("log");
util.inherits(TestClass,Emitter);//继承

function f1 (dem) {
    console.log("事件1被触发,"+dem);
}

var testClass = new TestClass();
//采用addListener注册事件
console.log("???=%d",Emitter.listenerCount(testClass,'event1'));
testClass.setMaxListeners=20;//默认10,超过10报警,可设置最大值  设置事件监听器个数
testClass.addListener('event1',f1);//f1传入参数会报错
//采用on方式注册
testClass.on('event1',f1);
//触发事件
testClass.emit('event1');
//移除事件
//testClass.removeListener("event1",f1);
//testClass.emit('event1');
//移除所有的事件
console.log("???=%d",Emitter.listenerCount(testClass,'event1'));
testClass.removeAllListeners();//testClass.removeAllListeners('event1');移除单个时间
testClass.emit('event1');
console.log("???=%d",Emitter.listenerCount(testClass,'event1'));
//once方法
testClass.once("once",function (a,b) {
   console.log("这是单次执行事件,参数a=%s,b=%s",a,b)
});
console.log("once=%d",Emitter.listenerCount(testClass,'once'));
testClass.emit('once',1,"ccd");
console.log("once=%d",Emitter.listenerCount(testClass,'once'));


