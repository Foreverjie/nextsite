var log = console.log.bind(log)

// 原型链继承
function Parents () {
    this.name = ['sss']
}

Parents.prototype.getName = function() {
    log(this.name)
}

function Child () {

}

// 原型指向父类的实例对象
Child.prototype = new Parents()

var c = new Child()

c.getName()

// 问题：对象共享内存
c.name.push('ddd')
c.getName()
var c2 = new Child()
c2.getName()

/////////////////////////////////////////////////

// 构造函数继承
function Parents2 (name) {
    this.name = ['nicky', name]
    this.getName = function () {
        log(this.name)
    }
}

function Child2 (name) {
    Parents2.call(this, name)
}

var c3 = new Child2('c3')
var c4 = new Child2('c4')
c3.name.push('extra')
c3.getName()
c4.getName()

// 优点
// 1、避免引用类型属性被所有实例共享
// 2、可以从 child 向 parent 传参
// 缺点：每次创建实例都会创建一遍方法

// 通过原型链实现的继承，都是复用同一个属性和方法；通过构造函数实现的继承，都是独立的属性和方法

//////////////////////////////////////////////////
// 组合继承————实现对函数复用，属性分离
function Student(name) {
    this.name = name
    this.hobbies = ['sing', 'jump', 'rap']
}

function GreatStudent(name, age) {
    Student.call(this, name)
    this.age = age
}

Student.prototype.getInfo = function () {
    log(this.name, this.hobbies)
}
GreatStudent.prototype = new Student()
GreatStudent.prototype.constructor = GreatStudent

var kunkun = new GreatStudent('kunkun', 20)
var fakekun = new GreatStudent('fakekun', 28)

kunkun.getInfo()
fakekun.getInfo()

kunkun.hobbies.push('basketball')

kunkun.getInfo()
fakekun.getInfo()

var heima = new GreatStudent('heima', 18)
heima.getInfo()

/////////////////////////////////////////////////////////
// 原型式继承
function CreateObj(o) {
    function F() {}
    F.prototype = o
    return new F()
}

var person = {
    name: 'p',
    hobbies: ['eat', 'sleep']
}

var person1 = CreateObj(person)
var person2 = CreateObj(person)

log(person1.name, person1.hobbies)
log(person2.name, person2.hobbies)

person1.name = 'person1'
person1.hobbies.push('sing')

log(person1.name, person1.hobbies)
log(person2.name, person2.hobbies)

// 也会共享引用类型的值
// 修改了person1.name的值，person2.name的值并未发生改变，并不是因为person1和person2有独立的name值，
// 而是因为person1.name = "person1"这条语句是给person1实例对象添加了一个name属性，
// 而它的原型对象上name值并没有被修改，所以person2的name没有变化

/////////////////////////////////////////////////////////
// 寄生式继承 -- 功能增强
function CreateObj2 (o) {
    var clone = Object.create(o)
    clone.getName = function() {
        log('hi', this.name)
    }
    return clone
}

var person3 = {
    name: 'p3',
    hobbies: ['eat', 'sleep']
}

var person4 = CreateObj2(person3)
person4.getName()

///////////////////////////////////////////////////////
// 寄生组合式继承 -- 解决 组合式继承 调用两次父类构造函数的问题
function Student2 (name) {
    this.name = name
    this.hobbies = ['sing', 'jump']
}

function GreatStudent2 (name, age) {
    Student2.call(this, name)
    this.age = age
}

var F = function(){}
F.prototype = Student2.prototype
GreatStudent2.prototype = F.prototype

var kunkun2 = new GreatStudent2('kunkun', 20)
log(kunkun)
log(kunkun2)