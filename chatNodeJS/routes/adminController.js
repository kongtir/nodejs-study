var mongo = require('./../common/mongoKit');
const adminModel = require('./../models/adminModel');
var fs = require("fs");
var path = require('path');
String.prototype.myReplace=function(f,e){//吧f替换成e
    var reg=new RegExp(f,"g"); //创建正则RegExp对象
    return this.replace(reg,e);
};
//var dialog = require('art-dialog');
exports.login=function (req, res) {//登陆页面获取
    req.session.destroy();//清楚session
    var msg = req.body.msg;//这个方法是不正确的
    res.render('admin/login', { title: '欢迎登陆NODE聊天室' ,info:'欢迎登陆NODE聊天室'});
};
exports.doLogin=function (req, res) {//登陆页面提交
    var password =req.body.password,username = req.body.username;
    if(!password||!username) res.render("admin/login",{err:"请输入账户和密码",title: '欢迎登陆NODE聊天室'});
    mongo.find("admin", {username:username,password:password}).then(function (e) {
      if(e){
          //console.warn("----------+++++++++++++++",e[0]._id);
          req.session.userid = e[0]._id;
          req.session.username =username;
          res.redirect('/admin/index');
      }else res.render("admin/login",{err:"您的账户或密码不正确",title: '欢迎登陆NODE聊天室'});
    });
};
exports.index=function (req, res) {//后台首页
    res.render('admin/index', { title: '欢迎登陆NODE聊天室',admin:req.session.username, layout:'layoutadmin'});
};
//聊天室管理 roomlist
exports.roomlist=function (req, res) {//
    mongo.find("rooms",{}).then(function (e) {
        console.log(e);
        res.render('admin/roomlist', {  roomlist:"active_tab",roomdata:e, title: '聊天室管理',admin:req.session.username, layout:'layoutadmin'});

    });
};
//后台管理-添加聊天室
exports.addroom=function (req, res) {//
    var rModel = adminModel;
    rModel.name = req.body.roomname;
    rModel.maxSize = req.body.roommaxsize;
    rModel. subject= req.body.roomsubject;
    if(req.files.length>0){//转储文件
        var tempPath = req.files[0].path;
        var targetPath='public/UpImages/roomPhotos/' +req.files[0].filename;
        var fs1 =fs.renameSync(path.join(__dirname,tempPath),path.join(__dirname,"../"+targetPath));//该方法就能移动文件
        if(fs1==undefined)  rModel.photoUrl =targetPath.replace(/^.\/public/,'') ;
        // rModel.photoUrl =targetPath.substring(6) ;
        // fs.unlink(path.join(__dirname,"../"+tempPath), function(err){ console.warn(err) })
        //   if(fs.renameSync( tempPath, targetPath))rModel.photoUrl =targetPath ;
    }
    //写入数据
    mongo.add("rooms",rModel).then(function (e) {
        //console.log("====结果",e.insertedId); console.log(req.files);
        //res.send(e.insertedId);
        res.redirect("/admin/roomlist");
    });
   // res.render('admin/addroom', {  roomlist:"active_tab", title: '添加聊天室',admin:req.session.username, layout:'layoutadmin',f1:"active_tab"});
};
//编辑聊天室
exports.editroom =function (req, res) {
    mongo.find('rooms',{_id:req.bod._id}).then(function (e) {

        res.render('admin/editroom', {  roomlist:"active_tab",title: '编辑聊天室',admin:req.session.username, layout:'layoutadmin' });

    });
};
//编辑聊天室
exports.doeditroom =function (req, res) {
    mongo.find('rooms',{_id:req.bod._id}).then(function (e) {

        res.render('admin/editroom', {  roomlist:"active_tab",title: '编辑聊天室',admin:req.session.username, layout:'layoutadmin' });

    });
};
