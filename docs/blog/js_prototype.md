# JS基础

## 1. prototype vs `__proto__`

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

## 2. 作用域

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

## 3. 函数执行上下文

#### 变量提升 vs 函数提升

变量提升

``` JavaScript
// 变量提升 相当于执行 var foo;  此时foo为undefined
var foo = function () {
    console.log('foo1');
}
foo();  // foo1
var foo = function () {
    console.log('foo2');
}
foo();  // foo2
```

函数提升

``` js
function foo() {
    console.log('foo1');
}
foo();  // foo2
function foo() {
    console.log('foo2');
}
foo(); // foo2
```

```js
console.log(foo);
function foo(){
    console.log("foo");
}
var foo = 1;
console.log(foo);
// function foo(){
//     console.log("foo");
// }
//  1
```

> 进入执行上下文，优先处理函数声明，再处理变量声明。

```js
// 以上代码执行过程
function foo(){
    console.log("foo");
}
var foo;
console.log(foo);
foo = 1;
console.log(foo);
```

## 4. 模拟call & apply函数

call，apply函数改变函数的执行环境即this的指向。
call函数接收的是参数列表
apply函数接收的是参数数组

### 模拟call函数

1. 将函数设置为该对象的属性
2. 执行该函数
3. 删除该函数

```js
var foo = {
    value: 1
};
function bar(a, b) {
    console.log(a, b);
    console.log('value:', this.value);
}
bar.call(foo);

// =====>

var foo = {
    value: 1,
    bar: function() {
        console.log(this.value);
    }
}

// 将函数设置为对象的属性 ==>  执行函数 ==> 删除该属性

Function.prototype.mycall = function(context) {
    context.fn = this;  
    context.fn();
    delete context.fn;
}

bar.mycall(foo)

// 传参
Function.prototype.mycall = function(context, ...rest) {
    var context = context || null;
    context.fn = this;
    var res = context.fn(...rest);
    delete context.fn;
    return res;
}
bar.mycall(foo, 'a', 'b');

//apply
Function.prototype.myApply = function(context, arr) {
    var context = context || window;
    context.fn = this;
    var res = arr ? context.fn(...arr) : context.fn();
    delete context.fn;
    return res;
}
bar.myApply(foo, ['a', 'b']);

```

##5. 箭头函数

```js
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b();
// undefined Window
obj.c();
// 10, Object {...}
```

##6. 立即执行函数

```js
(function(){console.log(1)})();  // 1
(function(){console.log(1)}())  // 1
+function(){console.log(1)}()   // 1
-function(){console.log(1)}()   // 1
var a = function(){console.log(1)}();   // 1
```
立即执行函数是通过运算符将函数声明转换为函数表达式，已达到立即执行效果