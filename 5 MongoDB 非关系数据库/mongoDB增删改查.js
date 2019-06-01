/*
C:\Program Files\MongoDB\Server\4.0\bin
./mongo
MongoDB查询命令：
db.[集合名].findOne();//查询第一个文档    eg:db.testdb.findOne();
db.[集合名].find();//查询所有文档        eg:db.testdb.find();
db.[集合名].find([条件对象]);//指定条件查询文档    eg:db.testdb.find({“title”:”NewsTitle”})
修改/更新命令
db.[集合名].update([条件对象],[新文档])   eg:db.testdb.update({“title”:”新闻标题2”},{“content”:”abc”})
注意：此种更新方式是用新文档替换旧文档。这会导致 title丢失
//单独修改命令
db.user.update({name:'小吴'},{$set:{money:90909099}})
db.user.update({name:'小吴'},{$inc:{age:-4}})
删除命令：
db.[集合名].remove();//移除集合下所有文档   eg:db.testdb.remove();
db.[集合名].remove({});//移除集合下符合条件的内容  eg:db.testdb.remove({“b”:”bbbb”});
============修改======================
1 切换数据库 user [dbname]
2 添加单条数据 db.dbname.insert({a:b,c:d})
3 添加多条数据 db.dbname.insert([{},{},{},{}])  // {} ={a:b,c:d...}
4 移除指定数据 db.dbname.remove({a:b})
5 更新记录,替换式更新 db.dbname.update({a:b},{c:d,...})
6 更新记录,更新指定的属性
6.1 替换或添加单条数据 db.dbname.update({a:b},$set:{c:d...})
6.2 对单条数据进行加减或追加 db.dbname.update({a:b},$inc:{c:-5,...})
7 更新记录,移除属性: db.user.update({name:'小孙'},{$unset:{age:true}})
8 更新记录,数组添加单个记录 db.user.update({name:'芒果'},{$push:{firendNames:['f1','f2','f3']}}) 此方式会把 ['f1','f2','f3'] 当作一个元素
9 更新记录,移除数组元素 db.user.update({name:'芒果'},{$pop:{firendNames:-1}})  //-1 从头开始移除,1从尾巴开始移除
10 更新记录.移除指定数组元素: db.user.update({'name':'芒果'},{$pull:{fns:'f4'}})
11 更新记录,指定数组元素下标更新   db.user.update({name:'芒果'},{$set:{'fns.1':{name:'f3',gift:1}}})  注意:fns.1 必须在引号内,否则报错,记录从0开始
12  更新,通过数组内部查找 重新替换数据  db.user.update({'name':'芒果','fns.name':'f3'},{$set:{"fns.$":4}})  将会把 {name:'f3',gift:1} 替换成 4
    更新记录,符合条件的第一个数组元素 db.user.update({name:'芒果'},{$set:{'fns.$':Object}})
                                    db.user.update({name:'芒果'},$set:{'fns.$:{'f4'}})
13 更新,数组中添加唯一记录 db.user.update({name:'芒果',fns:{$ne:'f2'}},{$push:{fns:'f2'}})
14 批量追加数组元素,同样,追加的元素没有与之前不重复 db.user.update({name:'芒果'},{$addToSet:{fns:{$each:['f1','f2','f3']}}})
===============查询=================
1 查询第一个文档 db.user.findOne()   db.user.findOne({name:'小明'})
2 查询第一个满足条件的指定属性[不显示ID] db.user.findOne({name:'小明'},{_id:false})
3 不指定条件查询一条记录的指定属性 db.user.findOne({},{_id:false})
4 查询所有记录 db.user.find()     db.user.find({name:'芒果'})
5 查询满足条件的指定字段db.user.find({},{_id:false}) db.user.find({name:'芒果'},{_id:false})
6 查询属性小于某值的记录 $lt db.user.find({age:{$lt:14}})
          小于等于      $lte
          大于           $gt
          大于等于      $gte
          等于        $eq
          不等于       $ne 没有相应记录也算着不等于    db.user.find({age:{$ne:12}})
7 查询属性值在指定集合的记录    db.user.find({age:{$in:[1,2,3]}})
            不在              db.user.find({age:{$nin:[12,13]}})
8 查询满足多个条件的记录 db.user.find({$or:[{age:{$nin:[12,13]}},{name:'芒果'}]})
9 取模运算  age/4 余2的记录   db.user.find({age:{$mod:[4,2]}})
10 对取模运算进行取反    db.user.find({age:{$not:{$mod:[4,2]}}}) $not 对指定完整条件取反
11 找到没有该属性的人(包括null)    db.user.find({age:null})
12 找到有该属性的并且为null   db.user.find({age:{$in:[null],$exists:true}})   db.user.find({age:{$eq:null,$exists:true}})
---------------------------------
1 正则匹配查询 db.user.find({r1:/r1/i})
2 数组匹配方式:只要指定数组的一个元素即可匹配   db.user.insert({arr:[1,2,3,4,5]})  db.user.find({arr:4})
3 数组的多项匹配,不含顺序  $all    db.user.find({arr:{$all:[5,6]}})        db.user.insert({arr:[1,2,3,4,5,6,7]})
4 数组精确匹配    db.user.find({arr:[1,2,3,4,5]})
5 查询数组值个数满足指定值的记录  $size     db.user.find({'students.classes':{$size:3}})
6 将查询记录里数组属性进行截取,返回子数组 -n,从尾开始算取几个,n从首开始算取几个 db.user.find({'students.classes':{$size:3}},{'students.classes':{$slice:-1}})
7  db.user.find({'students.classes':{$size:3}},{'students.classes':{$slice:[1,2]}})  //从下标为1 开始取2位
8    根据内嵌文档条件查询记录    db.user.insert({p1:{p1:1}})    db.user.find({"p1.p1":1})
9  查询children中名字为n1,年龄大于等于18的记录
    db.user.insert({name:'name1',children:[{name:'n1',age:18},{name:'n2',age:13}]})
    db.user.find({children:{$elemMatch:{name:'n1'}}})
    db.user.find({children:{$elemMatch:{name:'n1',age:{$lte:18}}}})
10  自定义条件查询 db.user.find({$where:"this.name=='name1'"})
                    db.user.find({$where:"function(){return this.name=='name1'}"})
11    游标的使用,遍历完成后游标内容消失
    var cursor =db.user.find();
    while(cursor.hasNext()){
        var record = cursor.next();
        //dosomething...
        print(record.name);
    }
12 分页排序查询 :  db.user.find().sort({age:-1}).skip(1).limit(5)
13 计算集合内满足条件的文档数量 db.user.count()   db.user.count({name:'name1'})
14 distinct 的用法key,条件   db.user.distinct('age',{'age':{$gt:8}})
15 group 的使用
    15.1    查询每个name不同值的数量,没有name 记为 null(按姓名分组求人数)
    db.user.group({key:{"name":1},initial:{count:0},reduce:function reduce(doc,out){out.count++}})
    15.2    按照姓名分组求总分和人数
    db.user.group({key:{name:true},initial:{count:0,sum:0},reduce:function reduce(doc,out){out.count++;out.sum+=doc.score}})
    15.3    按照姓名分组,求1班学生的总分和人数 cond 条件
    db.user.group({key:{name:true},cond:{class:"1"},initial:{count:0,sum:0},reduce:function Reduce(doc,out){out.count++;out.sum+=doc.score;}})

 */
