---
title: "JavaScript基础知识总结"
date: "2024-01-15"
excerpt: "JavaScript是现代Web开发的核心语言，本文总结了JS的基础概念和常用技巧。"
tags: ["JavaScript", "前端", "基础"]
---

# JavaScript基础知识总结

JavaScript是一门动态的、弱类型的编程语言，是现代Web开发不可或缺的技术。

## 变量声明

### var、let、const的区别

```javascript
// var - 函数作用域，存在变量提升
var name = "张三";

// let - 块级作用域，不存在变量提升
let age = 25;

// const - 块级作用域，常量，不可重新赋值
const PI = 3.14159;
```

### 最佳实践
- 优先使用 `const`
- 需要重新赋值时使用 `let`
- 避免使用 `var`

## 数据类型

JavaScript有8种数据类型：

### 原始类型
1. **Number** - 数字
2. **String** - 字符串
3. **Boolean** - 布尔值
4. **Undefined** - 未定义
5. **Null** - 空值
6. **Symbol** - 符号（ES6新增）
7. **BigInt** - 大整数（ES2020新增）

### 引用类型
8. **Object** - 对象（包括数组、函数等）

## 函数

### 函数声明
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
```

### 箭头函数
```javascript
const greet = (name) => `Hello, ${name}!`;

// 更简洁的写法
const add = (a, b) => a + b;
```

### 高阶函数
```javascript
const numbers = [1, 2, 3, 4, 5];

// map - 转换数组
const doubled = numbers.map(n => n * 2);

// filter - 过滤数组
const evens = numbers.filter(n => n % 2 === 0);

// reduce - 归约数组
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

## 异步编程

### Promise
```javascript
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("数据获取成功");
        }, 1000);
    });
};

fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### async/await
```javascript
const getData = async () => {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};
```

## 总结

JavaScript是一门功能强大的语言，掌握这些基础概念对于前端开发至关重要。继续学习ES6+的新特性，能让你的代码更加现代化和高效。

## 参考资源

- [MDN JavaScript文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [JavaScript.info](https://zh.javascript.info/)
- [ES6入门教程](https://es6.ruanyifeng.com/)