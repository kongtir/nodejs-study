/*
1 log4js (log for js ) 完成日志记录,express 不含日志
    安装 npm install log4js
 2 express  全局安装 cnpm install express express-generator -g
 3 找到任意文件夹, 安装express : express --hbs myNode
 4 安装所需包:npm install:目前只能一个个安装
  npm install log4js
   npm install mongodb


  5 配置log4js,并注册
  log4js.configure({
  appenders: {default:{type: 'console'}, cheese: { type: 'file', filename: 'logs/1.log' ,maxLogSize:102400,backups:4} },
  categories: { default: { appenders: ['default'], level: 'info' },cheese: { appenders: ['default','cheese'], level: 'debug' } },
  replaceConsole:true
});//然后需要注册log4js  配置 default 只有控制台打印,配置 cheese两种都有
app.use(log4js.connectLogger(log4js.getLogger("cheese"),{level:log4js.levels.INFO,format:':method:url:status'}));

一些扩展
https://www.npmjs.com/package/socket.io

 */