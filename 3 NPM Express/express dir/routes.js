var htmlHelper =require('./htmlHelper'),path = require('path');
//进入首页
exports.index=function (req, res) {
    //res.writeHead(200,{'Content-Type':'tetx/plain;charset=gbk;'});
    res.send("welcome2...<a href='/login'>登陆</a>");

 };
exports.api=function (req, res) {
    //res.writeHead(200,{'Content-Type':'tetx/plain;charset=gbk;'});
    res.write("'API DATA...'");
    res.end();
};
//进入登陆页面
exports.login=function (req, res) {
    var filename=path.join(__dirname,'/htmls/','login.html');
    var html = htmlHelper.renderHtml(filename);
    //console.log(html instanceof String);
    res.send(html);
   // console.log(html);
};
//系统登陆
exports.doLogin=function (req, res) {
    var rightAccount={username:'a',password:'a'};
    if(req.body.username==rightAccount.username&&req.body.password==rightAccount.password){
        res.redirect('/login_success');//跳转页面
    }else{
        console.log(req.body);
        res.send('登陆失败!');
    }
};
exports.login_success =function (req, res) {
    var filename = path.join(__dirname+"/htmls/login_success.html");
    var html = htmlHelper.renderHtml(filename);
    var rightAccount={username:'a',password:'a'};
    //html = new Buffer(html);
    html.replace(/{username}/g,rightAccount.username);
    html.replace(/{password}/g,rightAccount.password);
   // html =html.toString();
    res.send(html);
};
//404请求
exports.noFound =function (req, res) {
    var filename = path.join(__dirname+"/htmls/404.html");
    var html= htmlHelper.renderHtml(filename);
    res.send(html);
};
exports.userinfo = function (req, res) {
    var id = req.params.id;
    res.send('您的ID是:'+id);
}