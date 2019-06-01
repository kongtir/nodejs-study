/**
 * 1 console
 */
console.log("------------console.log-------------------");
//参考地址 https://blog.csdn.net/u010081689/article/details/51025836
//1、%c表示css样式  console.log('%c hello world', 'color: red;font-size: 24px;font-weight: bold;text-decoration: underline;');
// 2、%d表示数字  3、%i表示整型数字 4、%o表示DOM元素 console.log('%o', document.body); 5、%O表示javascript对象 console.log('%0', new Date());
//格式化打印(格式过多),类型转换,输出结果
console.log("%d %d %d",1,"string","20.3");
//格式打印(参数过多),多余参数按照空格隔开依次输出 略
//格式化打印%s 输出toString的值
console.log({name:'name1',arr:[1,2,"G^6"]});
console.log("结果是:%s.",{name:'name1'});
//%j 将参数按照json格式输出
console.log("结果是:%j.",{name:'name1'});
//% 百分号格式符
console.log("%",1);
console.log("------------console.info 不同级别的打印输出-------------------");

console.info("console.info");
console.warn("console.warn");
console.error("console.error");
//dir   打印对象的属性信息
var obj ={
    n1:1,n2:"string",n3:{
        n4:1,f5:function () {
            console.log("function");

        },
        n5:[]
    }
};
console.log("%j",obj);
console.dir(obj);
console.log("--------堆栈跟踪方法----------");
function f1() {
    //跟踪方法
    console.log("f1");
    console.trace("--l1--");
}
function f2() {
    f1();
}
//f2(); 取消注释体验堆栈跟踪 看着像错误
//===============time ,timeEnd 成对出现,用于测试代码执行时长=============
console.time('t1');//启动t1计时器
//do something...
for (var i=0;i<100000000;i++){}
console.timeEnd('t1');//停止计时器,此时会打印时长
//断言,判断表达式的值
console.assert(1==1,"1==1 is Error");//当表达式为false时输出制定内容
console.assert(1!=1,"1!=1 is Error");
console.assert(undefined,"undefined is Error");
console.assert(null,"null is Error");


