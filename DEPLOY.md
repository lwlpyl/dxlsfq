# 部署检查清单

## 路径检查

- [x] 所有 CSS 路径使用相对路径 (`styles.css`)
- [x] 所有 JS 路径使用相对路径 (`script.js`)
- [x] 所有图片路径使用相对路径 (`images/xxx`)
- [x] 所有音频路径使用相对路径 (`audio/bg.mp3`)
- [x] 添加 `<base href="./">` 确保子目录部署正常

## 部署到 GitHub Pages

### 方法 1: 推送到仓库

```bash
# 初始化 Git 仓库
cd D:\workspace\dxlsfq
git init
git add .
git commit -m "Initial commit"

# 关联远程仓库
git remote add origin https://github.com/lwlpyl/dxlsfq.git

# 推送代码
git push -u origin main
```

### 方法 2: 上传文件

1. 访问 https://github.com/lwlpyl/dxlsfq
2. 点击 "Add file" → "Upload files"
3. 拖拽所有文件上传
4. 点击 "Commit changes"

### 启用 GitHub Pages

1. 进入仓库 Settings
2. 点击左侧 "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main" 和 "/ (root)"
5. 点击 "Save"
6. 等待几分钟后访问：`https://lwlpyl.github.io/dxlsfq/`

## 验证清单

部署后检查以下项目：

- [ ] 网站首页正常加载
- [ ] CSS 样式正常显示
- [ ] JavaScript 功能正常（分类筛选、图片放大）
- [ ] 所有产品图片正常显示
- [ ] 微信二维码图片正常显示
- [ ] 背景音乐可以播放
- [ ] 手机和桌面端响应式正常
- [ ] 联系信息正确显示

## 文件结构

确保上传以下文件：

```
dxlsfq/
├── index.html          ✓
├── styles.css          ✓
├── script.js           ✓
├── README.md           ✓
├── audio/
│   ├── bg.mp3          ✓
│   └── README.md       ✓
└── images/
    ├── wechat.jpg      ✓
    ├── foxiang/        ✓ (15 张)
    ├── tongzhong/      ✓ (4 张)
    ├── xianglu/        ✓ (4 张)
    ├── baoding/        ✓ (3 张)
    ├── paibian/        ✓ (3 张)
    ├── muyu/           ✓ (1 张)
    ├── nianzhu/        ✓ (1 张)
    └── README.md       ✓
```

## 常见问题

### Q: 图片不显示？
A: 检查文件名大小写是否正确（GitHub 区分大小写）

### Q: 音乐不播放？
A: 浏览器限制自动播放，点击音乐按钮即可

### Q: 样式错乱？
A: 清除浏览器缓存，强制刷新（Ctrl+F5）

### Q: 404 错误？
A: 等待几分钟，GitHub Pages 需要时间构建

---

**部署完成后访问**: https://lwlpyl.github.io/dxlsfq/
