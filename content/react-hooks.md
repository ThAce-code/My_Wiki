---
title: "React Hooks完全指南"
date: "2024-01-20"
excerpt: "React Hooks让函数组件拥有了状态管理和生命周期的能力，本文详细介绍常用Hooks的使用方法。"
tags: ["React", "Hooks", "前端"]
---

# React Hooks完全指南

React Hooks是React 16.8引入的新特性，让我们可以在函数组件中使用状态和其他React特性。

## useState - 状态管理

### 基本用法
```jsx
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>当前计数: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                增加
            </button>
        </div>
    );
}
```

### 函数式更新
```jsx
// 推荐：使用函数式更新
setCount(prevCount => prevCount + 1);

// 避免：直接使用当前值
setCount(count + 1);
```

## useEffect - 副作用处理

### 基本用法
```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 获取用户数据
        fetchUser(userId).then(setUser);
    }, [userId]); // 依赖数组

    if (!user) return <div>加载中...</div>;

    return <div>用户名: {user.name}</div>;
}
```

### 清理副作用
```jsx
useEffect(() => {
    const timer = setInterval(() => {
        console.log('定时器执行');
    }, 1000);

    // 清理函数
    return () => {
        clearInterval(timer);
    };
}, []);
```

## useContext - 上下文

### 创建Context
```jsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Header />
        </ThemeContext.Provider>
    );
}

function Header() {
    const theme = useContext(ThemeContext);
    return <div className={`header-${theme}`}>头部</div>;
}
```

## useReducer - 复杂状态管理

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return initialState;
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            计数: {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>
                +
            </button>
            <button onClick={() => dispatch({ type: 'decrement' })}>
                -
            </button>
            <button onClick={() => dispatch({ type: 'reset' })}>
                重置
            </button>
        </div>
    );
}
```

## 自定义Hooks

### 创建自定义Hook
```jsx
import { useState, useEffect } from 'react';

// 自定义Hook：获取数据
function useApi(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

// 使用自定义Hook
function UserList() {
    const { data: users, loading, error } = useApi('/api/users');

    if (loading) return <div>加载中...</div>;
    if (error) return <div>错误: {error.message}</div>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

## Hooks使用规则

### 1. 只在顶层调用Hooks
```jsx
// ✅ 正确
function MyComponent() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    
    // ...
}

// ❌ 错误 - 不要在循环、条件或嵌套函数中调用
function MyComponent() {
    if (someCondition) {
        const [count, setCount] = useState(0); // 错误！
    }
}
```

### 2. 只在React函数中调用Hooks
- React函数组件
- 自定义Hooks

## 性能优化Hooks

### useMemo - 缓存计算结果
```jsx
import React, { useMemo } from 'react';

function ExpensiveComponent({ items }) {
    const expensiveValue = useMemo(() => {
        return items.reduce((sum, item) => sum + item.value, 0);
    }, [items]);

    return <div>总值: {expensiveValue}</div>;
}
```

### useCallback - 缓存函数
```jsx
import React, { useCallback } from 'react';

function Parent({ items }) {
    const handleClick = useCallback((id) => {
        // 处理点击
    }, []);

    return (
        <div>
            {items.map(item => (
                <Child 
                    key={item.id} 
                    item={item} 
                    onClick={handleClick} 
                />
            ))}
        </div>
    );
}
```

## 总结

React Hooks让函数组件变得更加强大和灵活：

- **useState** - 管理组件状态
- **useEffect** - 处理副作用
- **useContext** - 访问上下文
- **useReducer** - 复杂状态管理
- **useMemo/useCallback** - 性能优化

掌握这些Hooks，你就能写出更简洁、更易维护的React代码！