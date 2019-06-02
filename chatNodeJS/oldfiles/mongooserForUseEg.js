//先包含进来
var MongoDB = require('./mongodb');
MongoDB.findOne('user_info', {_id: user_id}, function (err, res) {
    console.log(res);//查询一条数据
});
MongoDB.find('user_info', {type: 1}, {}, function (err, res) {
    console.log(res);//查询多条数据
});
MongoDB.updateData('user_info', {_id: user_info._id}, {$set: update_data}, function(err, user_info) {
    callback(null, user_info);//更新数据并返回结果集合
});
MongoDB.remove('user_data', {user_id: 1});//删除数据