//1创建索引
db.user.ensureIndex({name:1},{name:'index1'});
//2为内嵌文档创建索引
db.user.ensureIndex({"name.first":true});
//3创建唯一索引 1 正序,2 倒叙 该字段无法含有重复数据
db.user.ensureIndex({name:-1},{name:'index2',unique:true});
//4创建唯一索引,删除重复数据[似乎无法正常执行]
db.user.ensureIndex({name:-1},{name:'index2','unique':true},{'dropDups':true});
//5创建复合索引
db.user.ensureIndex({age:-1,name:1},{name:'index3'});
//-------------------删除索引------------------------
//6 查询分析
db.user.find({name:"小明"}).limit(5).explain();
//强制使用索引 关于name的索引必须存在
db.user.find().hint({name:1}).explain();
//8 查看表的索引db.system.indexes.find()   查不到
//9 删除索引
db.user.dropIndexes();
//10 用runCommand删除单个索引
db.runCommand({dropIndexes:"user","index":"*"});//删除所有,无法删除主键索引_id_
db.runCommand({dropIndexes:"user","index":"index2"});//删除index2
//11 修改索引  background 后台运行,类似创建索引
db.runCommand({name:1},{'background':true});
//12 创建地理空间 索引 db.p.insert({p:[1,2]})
db.p.ensureIndex({p:"2d"});
db.p.find({p:{$near:[1,2]}})  ;// $near 距离最近的
//13 geoNear 查出数据并算出距离
db.runCommand({"geoNear":"p","near":[10,9]})
