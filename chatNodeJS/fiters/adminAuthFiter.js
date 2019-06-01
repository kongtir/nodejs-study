var logger = require('./../common/logger');
exports.authorize=function (req, res, next) {
    if(!req.session.userid){
        logger("admin").error("登陆失败\t"+req.ip+"\t访问页面:"+req.url);
        res.redirect("/admin/login");
    }else {
        logger("admin").info(req.session.username+"\t"+req.ip+"\t访问页面:"+req.url);
        next();
    }
};