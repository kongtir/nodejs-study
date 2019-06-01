var log4jsc =require('log4js');
log4jsc.configure({
    appenders: {
        default: {type: 'console'},
        cheese: {type: 'file', filename: 'logs/fileLog.log', maxLogSize: 102400, backups: 4,pattern:"-yyyy-MM-dd",alwaysIncludePattern:false},
        fileAppender: {type: 'dateFile', filename: 'logs/dateLog.log',pattern:'-yyyy-MM-dd',alwaysIncludePattern:false},
        fileAppenderErr:{type:"file",filename:"logs/errLog.log",pattern:'-yyyy-MM-dd',maxLogSize:102400,backups:4,alwaysIncludePattern:false},
        admin:{type:"file",filename:"logs/adminLog.log",pattern:'-yyyy-MM-dd',maxLogSize:102400,backups:4,alwaysIncludePattern:false},
    },
    categories: {
        default: {appenders: ['default'], level: 'info'},
        c3: {appenders: ['default', 'cheese',"fileAppender"], level: 'debug'},
        err:{appenders:["fileAppenderErr"],level:"info"},
        admin:{appenders:["admin"],level:"info"}

    },
    replaceConsole: true
});//然后需要注册log4js,alwaysIncludePattern 是否总是包含 pattern
module.exports = log4jsc ;