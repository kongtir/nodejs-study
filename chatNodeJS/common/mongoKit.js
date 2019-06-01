//http://mongodb.github.io/node-mongodb-native/api-generated/db.html
//参考地址 ,目前的封装有许多功能没有
const mongodb = require('mongodb').MongoClient;// mongodb 操作包
const config = require('./config').dbconf;//配置文件
let state = null;// 根据状态判断是否有用户名
if(config.username!=''&&config.password!='') state = true; // 有用户名密码
else state = false;// 没有用户名密码
class app{// 定义基本类
    static getInstance(){ // 多次连接共享实例对象
        if(!app.instance)app.instance = new app();
        return app.instance;// 简化性能提升
    }
    constructor(){ //默认初始化执行方法
        this.dbClient = '';// 存放mongodb连接后的对象
        this.connect();// 初始化连接数据库
    };
    connect(){ // 连接
        if(state){// 有用户名密码
            return new Promise((resolve,reject) => {
                if(!this.dbClient){
                    mongodb.connect('mongodb://'+config.username+':'+config.password+'@'+config.address+':'+config.port+'/',{
                        useNewUrlParser:true
                    },(err,client) => {
                        if(!err){
                            this.dbClient = client.db(config.database);
                            resolve(this.dbClient);
                        }else{
                            reject(err);
                        };
                    });
                }else{
                    resolve(this.dbClient);
                };
            });
        }else{// 没有用户名密码
            return new Promise((resolve,reject) => {
                if(!this.dbClient){
                    mongodb.connect('mongodb://'+config.address+':'+config.port+'/',{
                        useNewUrlParser:true
                    },(err,client) => {
                        if(!err){
                            this.dbClient = client.db(config.database);
                            resolve(this.dbClient);
                        }else{
                            reject(err);
                        };
                    });
                }else{
                    resolve(this.dbClient);
                };
            });
        };
    };
    // 添加
    add(tableName,json){
        if(Array.isArray(json)){ //数组
             json.forEach(v=>{
                 v.createTime= new Date();
                 v.updateTime= new Date();
             });
        }else{
            json.createTime= new Date();
            json.updateTime= new Date();
        }

        return new Promise((resolve,reject) =>{
            this.connect().then(db => {
                db.collection(tableName).insertOne(json,(err,result) => {
                    if(!err){
                        resolve(result);
                        return;
                    };
                    reject(err);
                });
            });
        });
    };
    // 删除
    remove(tableName,json){
        return new Promise((resolve,reject) => {
            this.connect().then(db => {
                db.collection(tableName).removeOne(json,(err,result) => {
                    if(!err){
                        resolve(result);
                        return;
                    };
                    reject(err);
                });
            });
        });
    };
    // 更新
    update(tableName,condition,json){
        if(Array.isArray(json)){ //数组
            json.forEach(v=>{
                v.updateTime= new Date();
            });
        }else{
            json.updateTime= new Date();
        }
        return new Promise((resolve,reject) => {
            this.connect().then(db => {
                db.collection(tableName).updateOne(condition,{
                    $set:json
                },(err,result) => {
                    if(!err){
                        resolve(result);
                        return;
                    };
                    reject(err);
                });
            });
        });
    };
    // 查询
    find(tableName,json){
        return new Promise((resolve,reject) => {
            this.connect().then(db => {
                let result = db.collection(tableName).find(json);
                result.toArray((err,data) => {
                    if(!err){
                        resolve(data);
                        return;
                    }
                    reject(err);
                });
            });
        });
    };
    count(tableName,json){
        return new Promise((resolve,reject) => {
            this.connect().then(db => {
                let result = db.collection(tableName).count(json);
                result.then(function (e) {
                    resolve(e); reject(null);
                })

            });
        });
    };
};
// 导出模块
module.exports = app.getInstance();
//https://blog.csdn.net/weixin_43704471/article/details/86590392