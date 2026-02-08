# 安全审查报告

生成时间: 2026-02-08

## 📊 总体评估

| 项目 | 状态 | 严重性 |
|------|------|--------|
| XSS 防护 | ✅ 良好 | - |
| API 调用 | ✅ 无外部 API | - |
| 敏感信息暴露 | ⚠️ 中等 | 中 |
| CSP 策略 | ❌ 缺失 | 高 |
| 文件上传 | ⚠️ 需验证 | 中 |
| 第三方依赖 | ⚠️ 需审查 | 低 |

---

## 🔍 发现的问题

### 1. ❌ 缺少 Content Security Policy (CSP)

**严重性**: 高

**问题描述**:
- 未配置 CSP 头部
- 无法防御 XSS 注入攻击
- 外部脚本无限制加载

**影响**:
- XSS 攻击风险
- 数据泄露风险
- 恶意脚本注入

**修复方案**:

```astro
// src/layouts/MainLayout.astro
---
const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://unpkg.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://formspree.io;
  media-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;
---

<!-- 在 <head> 中添加 -->
<meta http-equiv="Content-Security-Policy" content={csp.trim()} />
```

### 2. ⚠️ Formspree 表单 ID 暴露

**严重性**: 中

**位置**: `src/pages/contact.astro:91`

**当前代码**:
```html
<form action="https://formspree.io/f/mpqjalap" method="POST">
```

**问题**:
- 表单 ID `mpqjalap` 暴露在前端代码
- 任何人都可以查看并滥用

**修复方案**:

1. **使用环境变量**:
```bash
# .env
VITE_FORMSPREE_ID=mpqjalap
```

2. **更新代码**:
```astro
---
const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
---

<form action={`https://formspree.io/f/${formspreeId}`} method="POST">
```

3. **添加速率限制**:
在 Formspree 后台配置速率限制，防止滥用

### 3. ⚠️ 外部 CDN 脚本

**严重性**: 低-中

**位置**: `src/components/CMScript.astro:8`

```html
<script src="https://unpkg.com/decap-cms@^3.1.0/dist/decap-cms.js"></script>
```

**风险**:
- CDN 被劫持风险
- 版本范围 `^3.1.0` 可能引入破坏性更新
- 无 SRI (Subresource Integrity) 验证

**修复方案**:

```astro
---
const CMS_VERSION = '3.1.0'; // 锁定具体版本
const CMS_INTEGRITY = 'sha384-XXX'; // 添加 SRI 哈希
---

<script
  src={`https://unpkg.com/decap-cms@${CMS_VERSION}/dist/decap-cms.js`}
  integrity={CMS_INTEGRITY}
  crossorigin="anonymous"
></script>
```

### 4. ⚠️ 文件上传缺少验证

**严重性**: 中

**位置**: `src/pages/contact.astro:205`

**当前代码**:
```html
<input
  type="file"
  accept=".pdf,.dxf,.dwg,.step,.stp,.iges,.igs,.jpg,.png"
  multiple
/>
```

**问题**:
- 仅前端验证，易绕过
- 无文件大小限制
- 无 MIME 类型验证
- Formspree 有 10MB 文件大小限制，但前端未告知

**修复方案**:

```html
<input
  type="file"
  id="files"
  name="files"
  multiple
  accept=".pdf,.dxf,.dwg,.step,.stp,.iges,.igs,.jpg,.png"
  maxlength="10485760" // 10MB 限制
  required
/>

<!-- 添加用户提示 -->
<p class="font-mono text-xs text-text-muted mt-2">
  最大文件大小: 10MB. 支持格式: PDF, DXF, STEP, IGES, JPG, PNG
</p>

<script>
  // 客户端验证
  const fileInput = document.getElementById('files');
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      if (file.size > MAX_SIZE) {
        alert(`文件 "${file.name}" 超过 10MB 限制`);
        fileInput.value = ''; // 清空选择
        return;
      }
    }
  });
</script>
```

### 5. ⚠️ 邮箱地址暴露

**严重性**: 低

**位置**: 多处

```html
<a href="mailto:Gben@trycay.com">Gben@trycay.com</a>
<a href="tel:+8618928435743">+86 189-2843-5743</a>
```

**问题**:
- 邮箱地址可被爬虫抓取
- 可能收到垃圾邮件

**修复方案** (可选):

```html
<!-- 使用 JavaScript 混淆 -->
<script>
  const email = "Gben@trycay.com".split('').reverse().join('');
  document.getElementById('email-link').href = 'mailto:' + email.split('').reverse().join('');
</script>
<a id="email-link">联系我们</a>
```

或使用表单代替直接暴露邮箱

### 6. ✅ set:html 使用正确

**检查结果**: 安全

所有 `set:html` 都用于 `JSON.stringify()` 输出，自动转义 HTML。

```astro
<script type="application/ld+json" set:html={JSON.stringify({...})} />
```

Astro 会自动转义内容，防止 XSS。

---

## 🛡️ 安全增强建议

### 1. 添加安全头部

创建 `astro/vite-plugin-headers.js`:

```javascript
export default function headers() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  };
}
```

### 2. 启用 HTTPS 强制

确保生产环境：
- 使用 HTTPS
- 配置 HSTS 头部
- 重定向 HTTP 到 HTTPS

### 3. 添加依赖安全扫描

```json
// package.json
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix"
  }
}
```

### 4. 定期更新依赖

```bash
# 检查过期包
npm outdated

# 更新包
npm update

# 审计安全漏洞
npm audit
```

### 5. 配置 .env 模板

创建 `.env.example`:

```bash
# Formspree 表单 ID
VITE_FORMSPREE_ID=your_formspree_id_here

# 其他敏感配置
```

---

## 📋 安全检查清单

- [ ] 配置 Content Security Policy
- [ ] 将 Formspree ID 移至环境变量
- [ ] 锁定外部脚本版本
- [ ] 添加 SRI 验证
- [ ] 实现文件上传验证
- [ ] 添加安全响应头部
- [ ] 定期运行 `npm audit`
- [ ] 配置 HTTPS 和 HSTS
- [ ] 限制 CMS 访问权限
- [ ] 设置 Formspree 速率限制

---

## 🔐 安全最佳实践

### 开发阶段
1. ✅ 不在代码中硬编码密钥
2. ✅ 使用环境变量存储敏感信息
3. ✅ .env 文件已添加到 .gitignore
4. ✅ 使用 HTTPS 通信
5. ✅ 验证所有用户输入

### 部署阶段
1. ⚠️ 需要配置 CSP 头部
2. ⚠️ 需要添加安全响应头部
3. ⚠️ 需要启用 HTTPS
4. ⚠️ 需要配置速率限制

### 运维阶段
1. 定期更新依赖
2. 监控安全公告
3. 审计访问日志
4. 备份数据

---

## 📞 需要帮助？

如需实施这些安全修复，请告诉我优先处理哪些问题。

**建议优先级**:
1. ⭐⭐⭐ CSP 配置
2. ⭐⭐⭐ 环境变量隔离
3. ⭐⭐ 文件上传验证
4. ⭐ 外部脚本 SRI
5. ⭐ 邮箱混淆 (可选)
