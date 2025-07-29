# 🚀 Cloudflare Workers 部署指南

## 快速部署你的性格测试到 Cloudflare Workers

### 📋 准备工作

1. **注册 Cloudflare 账户**
   - 访问 [cloudflare.com](https://www.cloudflare.com) 并注册免费账户
   - 免费额度包含每天 100,000 次请求，对个人项目完全够用

2. **安装 Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

### 🔑 配置认证

1. **登录 Cloudflare**
   ```bash
   wrangler login
   ```
   这会打开浏览器窗口进行授权

2. **验证登录**
   ```bash
   wrangler whoami
   ```

### 🚀 部署步骤

1. **部署到 Cloudflare Workers**
   ```bash
   wrangler deploy
   ```

2. **查看部署结果**
   - 部署成功后会显示你的网站 URL
   - 格式通常是：`https://personality-quiz.your-subdomain.workers.dev`

### 🎯 一键部署命令

如果你已经配置好 Wrangler，直接运行：

```bash
# 部署到生产环境
wrangler deploy

# 或者先在开发环境测试
wrangler dev
```

### 🔧 自定义配置

#### 更改项目名称
编辑 `wrangler.toml` 文件中的 `name` 字段：
```toml
name = "my-personality-quiz"  # 改成你想要的名称
```

#### 绑定自定义域名
如果你有自己的域名，可以在 `wrangler.toml` 中配置：
```toml
routes = [
  { pattern = "quiz.your-domain.com/*", zone_name = "your-domain.com" }
]
```

### 📱 部署后的功能

✅ **完整功能**
- 10个性格测试问题
- 16种 MBTI 性格类型结果
- 精美动画和交互效果
- 移动端完美适配
- 结果分享功能

✅ **性能优势**
- 全球 CDN 加速
- 毫秒级响应时间
- 99.9% 可用性
- 免费 SSL 证书

### 🌐 访问你的网站

部署完成后，你会得到一个类似这样的 URL：
```
https://personality-quiz.your-username.workers.dev
```

现在任何人都可以通过这个链接访问你的可爱性格测试了！

### 🔄 更新网站

当你想要更新网站时，只需要：
1. 修改 `worker.js` 文件
2. 运行 `wrangler deploy`
3. 更新会立即生效

### 💡 小贴士

- **免费额度**: 每天 100,000 次请求，对个人项目非常充足
- **快速访问**: 全球边缘网络，加载速度极快
- **零维护**: 无需服务器管理，Cloudflare 自动处理所有基础设施
- **安全性**: 自动 DDoS 防护和 SSL 加密

祝你的性格测试网站部署成功！🎉 