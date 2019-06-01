/*
1 下载 https://www.mongodb.com/download-center#community
2 安装
3 找到文件夹 C:\Program Files\MongoDB\Server\4.0\bin
4 建立路径C:\Site\mongodata
5 运行(Windows PowerShell ) : ./mongod -dbpath 'C:\Site\mongodata'
最后显示 waiting for connections on port 27017 ...  28017 为管理端口
上述管理端口无法访问:https://www.cnblogs.com/xiaohuochai/p/8794687.html
根据以上链接,
安装
　　首先，全局安装 mongo-express 包

npm install -g mongo-express
　　接着，使用如下命令来找到mongo-express的安装目录

npm list -g mongo-express
　　在win10下的输出结果是：

C:\Users\kongt\AppData\Roaming\npm
　　然后进入该目录下的node_modules/mongo-express目录中，找到config.js文件，复制该文件，并命名为config.default.js文件

　　这样，config.default.js文件保存在默认配置，而config.js则进行自定义配置
配置
　　接下来，修改配置文件config.js
...
if (process.env.VCAP_SERVICES) {
  var dbLabel = 'mongodb-2.4';
  var env = JSON.parse(process.env.VCAP_SERVICES);
  if (env[dbLabel]) {
    mongo = env[dbLabel][0].credentials;
  }
} else {
  mongo = {
    db:'blogs',
    host:"118.1.1.1",
    port:27017,
    ssl:false,
    username:'blogs',
    password:'123456',
    url:"mongodb://118.1.1.1:27017/blogs",
    // setting the connection string will only give access to that database
    // to see more databases you need to set mongodb.admin to true or add databases to the mongodb.auth list
    connectionString: process.env.ME_CONFIG_MONGODB_SERVER ? '' : process.env.ME_CONFIG_MONGODB_URL,
  };
}
...

启动
　　由于mongo-express是全局安装，则可以在任何目录下，使用mongo-express命令来启动应用

mongo-express
　　输入完成后，控制台输出如下信息

Mongo Express server listening at http://localhost:8081
basicAuth credentials are "admin:pass", it is recommended you change this in your config.js!
Database connected
Connecting to blogs...
Database blogs connected
　　在地址栏中，输入localhost:8081，以用户名：admin，密码：pass的验证即可登录

-------------------
链接数据库./mongo
 db.table1.insert({name:'name01'})

 */