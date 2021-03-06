
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

// 求两个数组的并集交集

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [5, 6, 7, 8, 9];

console.log([...new Set([...arr1, ...arr2])]);

console.log([...new Set(arr1.filter(x => new Set(arr2).has(x)))]);