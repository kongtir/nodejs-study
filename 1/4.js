function parent() {
    this.name="name";
    this.say=function () {
        console.log("I can say");
    }
}
function child() {
    var p=new parent();
    p.name="name1";
    p.say =function () {
        console.log("child say");

    }
    return p;
}
var p1 = new parent();
var p2 = new child();

console.log(p1);
p1.say()
console.log(p2);
p2.say()
console.log(p2.say())