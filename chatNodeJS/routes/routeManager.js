var index  =require("./index"),users  =require("./users")
    admin=require("./adminController"),adminAuthFiter=require("../fiters/adminAuthFiter");
//路由注册
exports.reg = function (app) {
    app.get("/",index);
    app.get("/users",users);
    app.get("/admin/login",admin.login);
    app.post("/admin/login",admin.doLogin);

    //后台管理页面
    app.get(["/admin/index","/admin"],adminAuthFiter.authorize,admin.index);
    app.get("/admin/roomlist",adminAuthFiter.authorize,admin.roomlist);
    app.post("/admin/addroom",adminAuthFiter.authorize,admin.addroom);
    app.get("/admin/editroom",adminAuthFiter.authorize,admin.editroom);
    app.post("/admin/editroom",adminAuthFiter.authorize,admin.doeditroom);
};
