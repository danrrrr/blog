# JS之原型理解

## prototype vs `__proto__`

- 每个函数都有一个prototype属性，且只有函数才有此属性
- 每个JS对象（除null）都具有__proto__属性，指向该对象的原型

```
function Person() {

}
var p = new Person();
console.log(p.__proto__ === Person.prototype); // true
```

