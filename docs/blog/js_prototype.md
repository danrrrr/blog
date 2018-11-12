# JS基础

## prototype vs `__proto__`

- 每个函数都有一个prototype属性，且只有函数才有此属性
- 每个JS对象（除null）都具有__proto__属性，指向该对象的原型

```JavaScript
function Person() {}
var p = new Person();
console.log(p.__proto__ === Person.prototype);
// true
console.log(p.__proto__.__proto__ === Object.prototype)
// true
console.log(p.__proto__.__proto__.__proto__)
// null
```

![原型链](/blog/prototype5.png)

## 作用域

```JavaScript
var a = 1;
function foo() {
    console.log(a);
}
function bar() {
    var a = 2;
    foo();
}
bar(); // 1 
```

> 函数的作用域是函数定义时决定的