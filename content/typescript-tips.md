---
title: "TypeScript实用技巧集合"
date: "2024-01-25"
excerpt: "TypeScript为JavaScript添加了静态类型检查，本文分享一些实用的TS技巧和最佳实践。"
tags: ["TypeScript", "JavaScript", "类型系统"]
---

# TypeScript实用技巧集合

TypeScript是JavaScript的超集，为代码添加了静态类型检查，让开发更加安全和高效。

## 基础类型定义

### 接口 vs 类型别名
```typescript
// 接口 - 可扩展
interface User {
    id: number;
    name: string;
    email: string;
}

interface AdminUser extends User {
    permissions: string[];
}

// 类型别名 - 更灵活
type Status = 'pending' | 'approved' | 'rejected';
type ApiResponse<T> = {
    data: T;
    status: Status;
    message?: string;
};
```

### 可选属性和只读属性
```typescript
interface Config {
    readonly apiUrl: string;    // 只读
    timeout?: number;           // 可选
    retries: number;
}

const config: Config = {
    apiUrl: 'https://api.example.com',
    retries: 3
    // timeout 是可选的
};
```

## 高级类型技巧

### 联合类型和类型守卫
```typescript
type Shape = 
    | { kind: 'circle'; radius: number }
    | { kind: 'rectangle'; width: number; height: number }
    | { kind: 'square'; size: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'rectangle':
            return shape.width * shape.height;
        case 'square':
            return shape.size ** 2;
        default:
            // TypeScript会确保所有情况都被处理
            const _exhaustive: never = shape;
            return _exhaustive;
    }
}
```

### 泛型约束
```typescript
// 基础泛型
function identity<T>(arg: T): T {
    return arg;
}

// 泛型约束
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// 键约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: 'Alice', age: 30 };
const name = getProperty(person, 'name'); // 类型为 string
```

## 实用工具类型

### 内置工具类型
```typescript
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Partial - 所有属性变为可选
type PartialUser = Partial<User>;

// Pick - 选择特定属性
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

// Omit - 排除特定属性
type UserWithoutPassword = Omit<User, 'password'>;

// Required - 所有属性变为必需
type RequiredUser = Required<PartialUser>;

// Record - 创建对象类型
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
```

### 自定义工具类型
```typescript
// 深度只读
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// 非空类型
type NonNullable<T> = T extends null | undefined ? never : T;

// 函数参数类型
type Parameters<T extends (...args: any) => any> = 
    T extends (...args: infer P) => any ? P : never;

// 函数返回类型
type ReturnType<T extends (...args: any) => any> = 
    T extends (...args: any) => infer R ? R : any;
```

## React + TypeScript

### 组件Props类型
```typescript
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false
}) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
```

### Hooks类型
```typescript
import { useState, useEffect, useRef } from 'react';

// useState 类型推断
const [count, setCount] = useState(0); // 自动推断为 number
const [user, setUser] = useState<User | null>(null); // 显式类型

// useRef 类型
const inputRef = useRef<HTMLInputElement>(null);

// 自定义Hook类型
function useApi<T>(url: string): {
    data: T | null;
    loading: boolean;
    error: string | null;
} {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // API调用逻辑
    }, [url]);

    return { data, loading, error };
}
```

## 类型断言和类型守卫

### 类型断言
```typescript
// as 断言
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

// 尖括号断言（JSX中不推荐）
const canvas2 = <HTMLCanvasElement>document.getElementById('canvas');

// 非空断言
const user = getUser()!; // 确定不为null/undefined
```

### 自定义类型守卫
```typescript
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isUser(obj: any): obj is User {
    return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
}

// 使用类型守卫
function processValue(value: unknown) {
    if (isString(value)) {
        // 这里 value 的类型是 string
        console.log(value.toUpperCase());
    }
}
```

## 配置和最佳实践

### tsconfig.json 推荐配置
```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "node",
        "strict": true,
        "noImplicitAny": true,
        "noImplicitReturns": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "exactOptionalPropertyTypes": true,
        "noImplicitOverride": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

### 最佳实践
1. **启用严格模式** - `"strict": true`
2. **使用接口而非类型别名定义对象结构**
3. **优先使用类型推断，必要时才显式声明**
4. **使用联合类型而非any**
5. **为公共API编写详细的类型定义**

## 总结

TypeScript的类型系统非常强大，掌握这些技巧能让你：

- 写出更安全的代码
- 获得更好的IDE支持
- 减少运行时错误
- 提高代码可维护性

继续探索TypeScript的高级特性，你会发现它能极大提升开发体验！