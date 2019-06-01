/**
 Jade是node的模板引擎
 官网地址：http://jade-lang.com/
 http://jade-lang.com/pia
 doctype html //申明文档类型
 html(lang=“en”)//属性用括号，多个属性用逗号隔开
 #container //ID用#开头，默认标签为div
 .col //class用.开头，默认标签为div
 缩进表示包含关系
 语句之后加点(.)，点之后放置大段文字
 中横线(-)开始，表示定义代码
 等号(=)表示赋值
 竖线(|)开始，表示输出纯文本
 */
var jade = require('jade');
//方式一
//jade.compile('p',[options]);
var f1 =jade.compile('p');
console.log(f1());
//方式二
jade.render('h5#idh5.class',null,function (err, html) {
    console.log('内部',html); //加了回调外部没有值
});
//方式三  pretty:true 保留空行,可不传
jade.renderFile(__dirname+'/1.jade',{pretty:true},function (err, html) {
    if(err) throw  err;
    console.log(html);
});
