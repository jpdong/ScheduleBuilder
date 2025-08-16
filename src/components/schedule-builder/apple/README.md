# 🍎 Apple风格 ScheduleBuilder

一个基于Apple设计系统的现代化日程管理组件，提供极简、优雅的用户体验。

## ✨ 特性

### 🎨 设计特色
- **极简主义设计** - 基于Apple HIG设计规范
- **毛玻璃效果** - 现代化的视觉层次
- **动态色彩系统** - 自动适配深色模式
- **流畅动画** - 60fps的丝滑交互体验
- **无障碍支持** - 符合WCAG 2.1 AA标准

### 💡 智能交互
- **长按快速操作** - 长按空白区域快速创建事件
- **智能时间建议** - 自动推荐合理的时间安排
- **键盘快捷键** - 支持全键盘操作
- **拖拽重排** - 直观的事件管理
- **上下文菜单** - 右键快速操作

### 📱 响应式设计
- **自适应布局** - 完美适配所有设备
- **触摸优化** - 专为移动设备优化的交互
- **性能优先** - 虚拟滚动处理大量数据

## 🚀 快速开始

### 安装

```bash
# 组件已集成在项目中，无需额外安装
```

### 基础使用

```tsx
import AppleScheduleBuilderApp from '@/components/schedule-builder/apple';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <AppleScheduleBuilderApp />
    </div>
  );
}
```

### 自定义使用

```tsx
import { AppleScheduleBuilder, ScheduleProvider } from '@/components/schedule-builder/apple';

function CustomApp() {
  return (
    <ScheduleProvider>
      <AppleScheduleBuilder className="custom-schedule" />
    </ScheduleProvider>
  );
}
```

## 📚 API 文档

### AppleScheduleBuilderApp

主应用组件，包含完整的上下文提供者。

```tsx
interface AppleScheduleBuilderAppProps {
  className?: string;
}
```

### AppleScheduleBuilder

核心调度器组件。

```tsx
interface AppleScheduleBuilderProps {
  className?: string;
}
```

### AppleEventCard

事件卡片组件。

```tsx
interface AppleEventCardProps {
  event: Schedule;
  onClick: (event: Schedule) => void;
  className?: string;
}
```

### AppleCreateModal

创建/编辑事件模态框。

```tsx
interface AppleCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: Partial<Schedule>) => void;
  onDelete?: () => void;
  initialDate?: Date;
  initialSchedule?: Schedule;
  isEditing?: boolean;
}
```

### AppleQuickActions

快速操作面板。

```tsx
interface AppleQuickActionsProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onAction: (actionType: string) => void;
}
```

## 🎯 核心功能

### 时间管理
- ✅ 日/周/月视图切换
- ✅ 智能时间冲突检测
- ✅ 自动持续时间建议
- ✅ 多时区支持（规划中）

### 事件管理
- ✅ 拖拽创建和编辑
- ✅ 批量操作
- ✅ 模板系统
- ✅ 颜色编码分类

### 提醒系统
- ✅ 多种提醒方式
- ✅ 智能提醒建议
- ✅ 推送通知集成
- ✅ 邮件提醒（规划中）

### 协作功能
- ✅ 事件分享
- ✅ 日历导出
- ⏳ 实时协作（开发中）
- ⏳ 评论系统（规划中）

## 🎨 自定义主题

### CSS变量覆盖

```css
:root {
  /* 主色调自定义 */
  --apple-blue: #YOUR_COLOR;
  --apple-green: #YOUR_COLOR;
  
  /* 间距自定义 */
  --spacing-lg: 20px;
  
  /* 圆角自定义 */
  --radius-lg: 16px;
}
```

### 深色模式

组件自动检测系统偏好，也可手动控制：

```css
@media (prefers-color-scheme: dark) {
  /* 深色模式样式自动应用 */
}
```

## ⌨️ 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Cmd/Ctrl + N` | 新建事件 |
| `Escape` | 关闭模态框/面板 |
| `←/→` | 日期导航 |
| `T` | 回到今天 |
| `1/2/3` | 切换日/周/月视图 |
| `Space` | 打开选中事件 |
| `Delete` | 删除选中事件 |

## 🎭 动画系统

### 内置动画
- **页面转场** - 流畅的视图切换
- **模态框** - 弹性滑入动画
- **悬浮效果** - 微妙的上升动画
- **加载状态** - 骨架屏动画

### 自定义动画

```css
.custom-animation {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

## 📱 响应式断点

```css
/* 移动设备 */
@media (max-width: 768px) {
  /* 移动端优化 */
}

/* 平板设备 */
@media (min-width: 768px) and (max-width: 1024px) {
  /* 平板端优化 */
}

/* 桌面设备 */
@media (min-width: 1024px) {
  /* 桌面端优化 */
}
```

## 🔧 开发指南

### 项目结构

```
apple/
├── AppleScheduleBuilder.tsx    # 主组件
├── AppleEventCard.tsx         # 事件卡片
├── AppleCreateModal.tsx       # 创建模态框
├── AppleQuickActions.tsx      # 快速操作
├── apple-styles.css           # 核心样式
├── index.tsx                  # 导出文件
└── README.md                  # 文档
```

### 开发环境

```bash
# 启动开发服务器
npm run dev

# 访问Apple风格组件
http://localhost:3000/apple-schedule
```

### 构建优化

组件采用以下优化策略：
- ✅ React.memo 防止不必要重渲染
- ✅ useMemo/useCallback 缓存计算结果
- ✅ 懒加载模态框组件
- ✅ CSS-in-JS 最小化
- ✅ 树摇优化

## 🧪 测试

### 单元测试

```bash
# 运行测试
npm run test

# 覆盖率报告
npm run test:coverage
```

### E2E测试

```bash
# Playwright测试
npm run test:e2e
```

### 可访问性测试

```bash
# axe-core测试
npm run test:a11y
```

## 🐛 问题排查

### 常见问题

**Q: 组件样式没有加载？**
A: 确保导入了 `apple-styles.css` 文件。

**Q: 深色模式不生效？**
A: 检查系统设置或手动添加 `prefers-color-scheme` 媒体查询。

**Q: 触摸事件不响应？**
A: 确保添加了 `touch-action` CSS属性。

**Q: 性能问题？**
A: 启用虚拟滚动并检查是否有内存泄漏。

### 性能监控

```tsx
// 启用性能分析
if (process.env.NODE_ENV === 'development') {
  import('react-devtools-profiler');
}
```

## 🤝 贡献指南

### 代码风格

- 使用 TypeScript 严格模式
- 遵循 ESLint + Prettier 配置
- 组件必须有 PropTypes 或 TypeScript 接口
- 添加适当的注释和文档

### 提交规范

```bash
feat: 添加新功能
fix: 修复问题
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
perf: 性能优化
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- Apple Human Interface Guidelines
- SF Pro 字体系统
- React 生态系统
- 开源社区贡献者

---

**💡 提示**: 这个组件完全基于Apple设计系统构建，为用户提供熟悉而优雅的交互体验。