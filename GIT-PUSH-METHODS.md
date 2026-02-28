# Git 推送方式记录

## 方式一：SSH 方式（当前使用）

```bash
# 添加远程仓库（SSH）
git remote add origin git@github.com:sacdxj/Wire-Harness.git

# 推送
git push origin main

# 或简写
git push
```

**远程仓库配置：**
```
origin  git@github.com:sacdxj/Wire-Harness.git (push)
```

---

## 方式二：HTTPS 方式

```bash
# 添加远程仓库（HTTPS）
git remote add origin https://github.com/sacdxj/Wire-Harness.git

# 推送时需要输入用户名和 Personal Access Token
git push origin main
```

---

## 检查当前远程仓库方式

```bash
git remote -v
```

输出示例：
- SSH: `git@github.com:sacdxj/Wire-Harness.git`
- HTTPS: `https://github.com/sacdxj/Wire-Harness.git`
