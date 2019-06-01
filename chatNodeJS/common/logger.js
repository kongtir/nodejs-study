var log4js = require("./log4jsc");
module.exports = function(categoryName){
    return log4js.getLogger(categoryName||'c3');
};