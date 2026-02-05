# 网站配图使用清单

> 生成时间: 2026-02-04
> 模型: gemini-3-pro-image-preview
> 总数: 10 张高质量图片

---

## 📋 图片映射表

### 首页 (Homepage)

| 文件路径 | 尺寸 | 模块 | 说明 |
|---------|------|------|------|
| `homepage/hero.jpg` | 931KB | Hero Section | 现代化工厂生产线横幅图 (16:9) |

**使用方式**：
```astro
<img src="/images/homepage/hero.jpg" alt="Wire Harness Manufacturing Factory" />
```

---

### 产品 (Products)

| 文件路径 | 尺寸 | 模块 | 说明 |
|---------|------|------|------|
| `products/ph-series-connector.jpg` | 940KB | PH Series | JST PH 2.0mm 连接器特写 (1:1) |
| `products/xh-series-connector.jpg` | 441KB | XH Series | JST XH 2.5mm 连接器 (1:1) |
| `products/eh-series-connector.jpg` | 407KB | EH Series | JST EH 带弹射器连接器 (1:1) |
| `products/custom-wire-harness.jpg` | 398KB | Custom | 多分支定制线束 (1:1) |

**使用方式**：
```astro
<!-- 产品卡片 -->
<img src="/images/products/ph-series-connector.jpg" alt="JST PH Series Connector" />
<img src="/images/products/xh-series-connector.jpg" alt="JST XH Series Connector" />
<img src="/images/products/eh-series-connector.jpg" alt="JST EH Series Connector" />
<img src="/images/products/custom-wire-harness.jpg" alt="Custom Wire Harness Assembly" />
```

---

### 应用案例 (Applications)

| 文件路径 | 尺寸 | 模块 | 说明 |
|---------|------|------|------|
| `applications/consumer-electronics.jpg` | 796KB | Consumer Electronics | 智能手机内部连接 (1:1) |
| `applications/industrial-control.jpg` | 841KB | Industrial Control | PLC 控制柜内部 (16:9) |
| `applications/led-lighting.jpg` | 755KB | LED Lighting | LED 灯带系统 (16:9) |

**使用方式**：
```astro
<!-- 应用案例卡片 -->
<img src="/images/applications/consumer-electronics.jpg" alt="Consumer Electronics Applications" />
<img src="/images/applications/industrial-control.jpg" alt="Industrial Control Applications" />
<img src="/images/applications/led-lighting.jpg" alt="LED Lighting Applications" />
```

---

### 兼容性 (Compatibility)

| 文件路径 | 尺寸 | 模块 | 说明 |
|---------|------|------|------|
| `compatibility/jst-series-overview.jpg` | 781KB | JST Compatible | JST 全系列产品展示 (16:9) |

**使用方式**：
```astro
<img src="/images/compatibility/jst-series-overview.jpg" alt="JST Compatible Connector Series" />
```

---

### 工厂 (Factory)

| 文件路径 | 尺寸 | 模块 | 说明 |
|---------|------|------|------|
| `factory/exterior.jpg` | 577KB | Factory Hero | 工厂外观全景 (16:9) |

**使用方式**：
```astro
<img src="/images/factory/exterior.jpg" alt="Manufacturing Facility Exterior" />
```

---

## 🚀 快速使用

### 1. 在 Astro 组件中引用

```astro
<!-- 本地图片路径 -->
<img src="/images/homepage/hero.jpg" alt="Hero" />

<!-- 或者在 hero section 中作为背景图 -->
<div style="background-image: url('/images/homepage/hero.jpg')">
  <!-- 内容 -->
</div>
```

### 2. 在 Markdown 中使用

```markdown
![Factory](/images/factory/exterior.jpg)
```

### 3. 在 CSS 中使用

```css
.hero-section {
  background-image: url('/images/homepage/hero.jpg');
  background-size: cover;
}
```

---

## 📊 统计信息

- **总图片数**: 10 张
- **总大小**: 约 6.1 MB
- **格式**: JPG
- **质量**: 高清
- **比例**: 1:1 (方图) 和 16:9 (宽屏)

---

## ⚠️ 注意事项

1. **路径使用**: 所有图片路径以 `/images/` 开头，指向 `public/images/` 目录
2. **图片优化**: 已针对网页优化，无需额外压缩
3. **响应式**: 建议配合 `srcset` 使用不同尺寸
4. **懒加载**: 建议使用 `loading="lazy"` 属性

---

## 📝 更新日志

- 2026-02-04: 初始生成 10 张配图
- 待补充: 工厂生产线、质检设备、团队协作等场景图片
