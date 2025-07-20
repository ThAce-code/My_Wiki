# 自定义域名配置完整指南

## 📋 准备工作

### 1. 域名购买清单
- [ ] 选择域名服务商
- [ ] 确定域名名称
- [ ] 准备身份证明（国内服务商需要）
- [ ] 准备支付方式

### 2. 推荐购买方案

#### 方案A：阿里云（国内推荐）
```
网址：https://wanwang.aliyun.com
价格：.com 域名 ¥55/年
优势：国内访问快，中文客服
步骤：
1. 注册阿里云账号
2. 搜索心仪域名
3. 加入购物车并支付
4. 完成实名认证
```

#### 方案B：Cloudflare（国际推荐）
```
网址：https://www.cloudflare.com/products/registrar/
价格：.com 域名 ~$9/年
优势：成本价销售，自带CDN
步骤：
1. 注册 Cloudflare 账号
2. 搜索并购买域名
3. 自动配置 DNS
```

## 🔧 Vercel 域名配置

### 步骤1：在 Vercel 添加域名
1. 登录 Vercel Dashboard
2. 选择你的项目
3. 进入 Settings → Domains
4. 点击 "Add Domain"
5. 输入你的域名（如：`my-tech-wiki.com`）

### 步骤2：配置 DNS 记录

#### 如果使用根域名（如：example.com）
```
类型：A
名称：@
值：76.76.19.61
```

#### 如果使用子域名（如：www.example.com）
```
类型：CNAME
名称：www
值：cname.vercel-dns.com
```

#### 推荐配置（同时支持两种访问方式）
```
# 根域名
类型：A
名称：@
值：76.76.19.61

# www 子域名
类型：CNAME  
名称：www
值：cname.vercel-dns.com
```

### 步骤3：等待 DNS 生效
- 通常需要 5-30 分钟
- 最长可能需要 24-48 小时
- 可以使用 `nslookup` 命令检查

## 🛠️ 各服务商 DNS 配置方法

### 阿里云 DNS 配置
1. 登录阿里云控制台
2. 进入"域名与网站" → "云解析DNS"
3. 点击域名进入解析设置
4. 添加记录：
   ```
   记录类型：A / CNAME
   主机记录：@ / www
   解析路线：默认
   记录值：76.76.19.61 / cname.vercel-dns.com
   TTL：600
   ```

### Cloudflare DNS 配置
1. 登录 Cloudflare Dashboard
2. 选择你的域名
3. 进入 DNS 管理
4. 添加记录：
   ```
   Type: A / CNAME
   Name: @ / www  
   Content: 76.76.19.61 / cname.vercel-dns.com
   Proxy status: 🟠 Proxied (推荐开启)
   ```

### 腾讯云 DNS 配置
1. 登录腾讯云控制台
2. 进入"域名与网站" → "DNS解析DNSPod"
3. 选择域名进入管理
4. 添加记录：
   ```
   记录类型：A / CNAME
   主机记录：@ / www
   记录值：76.76.19.61 / cname.vercel-dns.com
   ```

## ✅ 验证配置

### 1. DNS 检查命令
```bash
# 检查 A 记录
nslookup your-domain.com

# 检查 CNAME 记录  
nslookup www.your-domain.com

# 使用 dig 命令（Linux/Mac）
dig your-domain.com
dig www.your-domain.com
```

### 2. 在线检查工具
- https://www.whatsmydns.net/
- https://dnschecker.org/
- https://www.nslookup.io/

### 3. Vercel 状态检查
在 Vercel Dashboard 中查看域名状态：
- ✅ Valid Configuration
- ⏳ Pending Verification  
- ❌ Invalid Configuration

## 🔒 SSL 证书配置

Vercel 会自动为你的自定义域名申请 Let's Encrypt SSL 证书：
- 通常在域名验证后 5-10 分钟内完成
- 支持自动续期
- 强制 HTTPS 重定向

## 🚨 常见问题解决

### 问题1：DNS 记录不生效
```bash
# 清除本地 DNS 缓存
# Windows
ipconfig /flushdns

# Mac
sudo dscacheutil -flushcache

# Linux
sudo systemctl restart systemd-resolved
```

### 问题2：SSL 证书申请失败
- 确保 DNS 记录正确指向 Vercel
- 等待 DNS 完全生效后再试
- 检查域名是否有 CAA 记录限制

### 问题3：域名访问 404
- 确认 Vercel 项目部署成功
- 检查域名配置是否正确
- 验证 DNS 记录是否生效

## 💰 成本预算

### 年度费用预估
```
域名费用：
- .com 域名：¥55-75/年
- .cn 域名：¥35-55/年  
- .tech 域名：¥150-200/年

其他费用：
- Vercel 托管：免费（个人项目）
- SSL 证书：免费（Let's Encrypt）
- CDN 加速：免费（Vercel 自带）

总计：¥35-200/年
```

## 📞 技术支持

如果遇到问题：
1. 查看 Vercel 官方文档
2. 联系域名服务商客服
3. 在 Vercel 社区寻求帮助
4. 使用在线 DNS 检查工具诊断

---
*配置完成后，你的网站将可以通过自定义域名正常访问，无需代理！*