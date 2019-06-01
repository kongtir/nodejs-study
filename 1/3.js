var Person =function (name) {
    var p = {name:name,age:0}
    var pub = {
        setName:function (name) {
            p.name=name;
        },
        getName:function () {
            return p.name;
        }
    }
    return pub;
}
var p1 = new Person("p1");
console.log(p1.getName());
p1.setName("ccc");
console.log(p1.getName());
