# 🍎 ScheduleBuilder Apple风格设计规范

## 🎯 设计哲学

**"Simplicity is the ultimate sophistication"** - Leonardo da Vinci

Apple风格设计遵循三大核心原则：
- **简洁性** (Simplicity) - 移除一切不必要的元素
- **清晰性** (Clarity) - 内容和功能一目了然  
- **深度感** (Depth) - 通过层次创造视觉深度

---

## 📐 设计系统

### 🎨 色彩体系

```
Primary Colors (主色调)
├── System Blue    #007AFF   (按钮、链接、强调)
├── System Green   #34C759   (成功、确认状态) 
├── System Orange  #FF9500   (警告、次要强调)
├── System Red     #FF3B30   (错误、删除操作)
└── System Purple  #AF52DE   (高级功能、创意)

Neutral Colors (中性色)
├── Label          #000000   (主要文本)
├── Secondary      #3C3C43   (次要文本 60% opacity)
├── Tertiary       #3C3C43   (第三级文本 30% opacity)
├── Quaternary     #3C3C43   (第四级文本 18% opacity)
├── System Gray    #8E8E93   (分隔线、辅助元素)
├── System Gray2   #AEAEB2   (占位符)
├── System Gray3   #C7C7CC   (表单边框)
├── System Gray4   #D1D1D6   (背景分隔)
├── System Gray5   #E5E5EA   (表单背景)
└── System Gray6   #F2F2F7   (页面背景)

Dynamic Colors (动态色彩 - 支持深色模式)
├── Background     #FFFFFF / #000000
├── Secondary BG   #F2F2F7 / #1C1C1E  
└── Tertiary BG    #FFFFFF / #2C2C2E
```

### 📏 间距系统

```
Spacing Scale (8pt 网格系统)
├── 4pt   = 0.25rem   (最小间距)
├── 8pt   = 0.5rem    (紧密间距)
├── 12pt  = 0.75rem   (小间距)
├── 16pt  = 1rem      (标准间距)
├── 20pt  = 1.25rem   (中等间距)
├── 24pt  = 1.5rem    (大间距)
├── 32pt  = 2rem      (超大间距)
├── 48pt  = 3rem      (分组间距)
└── 64pt  = 4rem      (页面间距)
```

### 🔤 字体系统

```
Typography (SF Pro 字体家族)
├── Display Large    48pt/52pt  (页面标题)
├── Display Medium   36pt/40pt  (章节标题)
├── Display Small    32pt/36pt  (卡片标题)
├── Headline Large   28pt/32pt  (重要标题)
├── Headline Medium  24pt/28pt  (次要标题)
├── Headline Small   20pt/24pt  (小标题)
├── Body Large       17pt/22pt  (正文大号)
├── Body Medium      15pt/20pt  (标准正文)
├── Body Small       13pt/18pt  (辅助文本)
├── Caption Large    12pt/16pt  (说明文字)
└── Caption Small    11pt/13pt  (标签文字)

Font Weights
├── Regular     400   (正文)
├── Medium      500   (强调)
├── Semibold    600   (标题)
└── Bold        700   (重要信息)
```

### 🔄 圆角系统

```
Border Radius
├── 4pt   小圆角   (按钮、输入框)
├── 8pt   标准圆角 (卡片、弹窗)
├── 12pt  大圆角   (面板、浮层)
├── 16pt  超大圆角 (主要容器)
└── 50%   圆形     (头像、图标)
```

### 🎭 阴影系统

```
Elevation Shadows
├── Level 1   0 1px 3px rgba(0,0,0,0.1)             (轻微浮起)
├── Level 2   0 2px 8px rgba(0,0,0,0.1)             (按钮悬浮)
├── Level 3   0 4px 16px rgba(0,0,0,0.1)            (卡片浮起)
├── Level 4   0 8px 24px rgba(0,0,0,0.12)           (弹窗浮层)
└── Level 5   0 16px 40px rgba(0,0,0,0.15)          (模态对话框)
```

---

## 🧩 核心组件规范

### 📅 日程卡片 (Event Card)

```
┌─────────────────────────────────────────────────┐
│  ● Meeting Title                       [⋯]     │
│  📍 Location • 👥 3 people                     │
│  🕒 2:00 PM - 3:30 PM (90 min)                 │
│                                                 │
│  ┌─ Notes ──────────────────────────────────┐   │
│  │ Brief description or agenda items...     │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

Specifications:
├── Card Size        最小高度 88pt，动态高度
├── Padding          16pt 内边距
├── Border Radius    12pt 圆角
├── Background       #FFFFFF (浮于页面背景)
├── Shadow           Level 2 阴影
├── Border           1pt solid rgba(0,0,0,0.06)
├── Color Strip      左侧 4pt 宽度色条
└── Animation        悬浮时轻微上升 2pt
```

### 🔘 按钮系统

```
Primary Button (主要按钮)
┌─────────────────┐
│   Create New    │  <- 高度44pt，圆角8pt
└─────────────────┘     背景#007AFF，文字白色

Secondary Button (次要按钮)  
┌─────────────────┐
│   Cancel        │  <- 高度44pt，圆角8pt
└─────────────────┘     背景透明，边框1pt，文字蓝色

Tertiary Button (第三级按钮)
┌─────────────────┐
│   Delete        │  <- 高度44pt，圆角8pt
└─────────────────┘     背景透明，文字红色

Icon Button (图标按钮)
┌───┐
│ + │  <- 36pt × 36pt，圆角8pt
└───┘     图标20pt大小

Floating Action Button (悬浮按钮)
    ┌─────┐
    │  +  │  <- 56pt × 56pt，圆形
    └─────┘     阴影Level 3
```

### 📝 输入框系统

```
Text Field (文本输入框)
┌─────────────────────────────────────────────────┐
│ Event Title                                     │
└─────────────────────────────────────────────────┘
├── 高度44pt，圆角8pt
├── 背景#F2F2F7，聚焦时#FFFFFF
├── 边框1pt，聚焦时2pt蓝色边框
├── 内边距12pt左右，10pt上下
└── 占位符颜色#8E8E93

Search Field (搜索框)
┌─────────────────────────────────────────────────┐
│ 🔍 Search events...                            │
└─────────────────────────────────────────────────┘
├── 高度36pt，圆角18pt
├── 背景#F2F2F7
├── 图标16pt，左边距12pt
└── 文字左边距8pt

Date Picker (日期选择器)
┌─────────────────┐
│ Mar 16, 2024 ▼ │  <- 高度44pt，右侧箭头图标
└─────────────────┘
```

### 🎛️ 导航系统

```
Tab Bar (标签栏)
┌─────────────────────────────────────────────────┐
│ ◉ Day      ○ Week      ○ Month              + │
└─────────────────────────────────────────────────┘
├── 高度44pt
├── 背景模糊效果 (backdrop-filter: blur(20px))
├── 边框底部1pt rgba(0,0,0,0.06)
├── 选中状态：圆形背景#007AFF，白色文字
└── 未选中：透明背景，灰色文字

Navigation Bar (导航栏)
┌─────────────────────────────────────────────────┐
│ ← Back    Schedule Builder               ⚙ ⋯  │
└─────────────────────────────────────────────────┘
├── 高度44pt + 安全区域
├── 背景模糊效果
├── 标题字体Headline Medium
└── 图标按钮28pt × 28pt
```

---

## 🗺️ 详细用户流程图

### 流程1：创建新日程

```
[用户进入应用] 
       ↓
┌─────────────────┐
│   主界面展示     │ ← 显示当日日程，简洁布局
│   Today视图     │
└─────────────────┘
       ↓ (点击 + 按钮)
┌─────────────────┐     ┌─────────────────┐
│  快速创建菜单    │ OR  │   空白时间段     │
│  📅 会议        │     │   点击创建       │
│  📞 电话        │     └─────────────────┘
│  ☕ 休息        │            ↓
│  ✈️ 出行        │     (自动填充时间)
└─────────────────┘            ↓
       ↓ (选择类型)      ┌─────────────────┐
┌─────────────────┐     │   创建表单       │
│   创建表单       │ →   │   (预填充)      │
│   (带模板)      │     └─────────────────┘
└─────────────────┘            ↓
       ↓ (填写信息)       ┌─────────────────┐
┌─────────────────┐     │   智能建议       │
│   表单校验       │ →   │   • 时间冲突     │
│   • 必填字段     │     │   • 位置建议     │
│   • 时间格式     │     │   • 参与人员     │
│   • 逻辑检查     │     └─────────────────┘
└─────────────────┘            ↓
       ↓ (校验通过)       ┌─────────────────┐
┌─────────────────┐     │   预览确认       │
│   保存动画       │ ←   │   最终检查       │
│   • 卡片生成     │     └─────────────────┘
│   • 滑入动效     │            ↓ (确认保存)
│   • 成功反馈     │     ┌─────────────────┐
└─────────────────┘     │   成功通知       │
       ↓                │   • Toast提示    │
┌─────────────────┐     │   • 返回主界面   │
│   返回主界面     │ ←   └─────────────────┘
│   显示新事件     │
└─────────────────┘
```

### 流程2：编辑现有日程

```
[用户浏览日程]
       ↓
┌─────────────────┐
│   日程卡片       │ ← 轻击进入详情，长按快速编辑
│   悬浮效果       │
└─────────────────┘
       ↓ (轻击卡片)
┌─────────────────┐     ┌─────────────────┐
│   详情模态框     │     │   快速操作菜单   │ ← (长按卡片)
│   • 完整信息     │     │   • 编辑         │
│   • 操作按钮     │     │   • 删除         │
│   • 分享选项     │     │   • 复制         │
└─────────────────┘     │   • 移动时间     │
       ↓ (点击编辑)       └─────────────────┘
┌─────────────────┐            ↓ (选择编辑)
│   编辑表单       │     ┌─────────────────┐
│   (预填数据)    │ ←   │   编辑表单       │
└─────────────────┘     │   (快速模式)    │
       ↓                └─────────────────┘
┌─────────────────┐            ↓
│   实时预览       │     ┌─────────────────┐
│   • 变更对比     │     │   冲突检测       │
│   • 影响分析     │ →   │   • 时间重叠     │
│   • 保存预览     │     │   • 资源冲突     │
└─────────────────┘     │   • 解决方案     │
       ↓                └─────────────────┘
┌─────────────────┐            ↓
│   保存确认       │     ┌─────────────────┐
│   • 变更摘要     │ ←   │   智能建议       │
│   • 通知设置     │     │   • 时间调整     │
│   • 同步选项     │     │   • 参与人通知   │
└─────────────────┘     └─────────────────┘
       ↓ (确认保存)
┌─────────────────┐
│   更新动画       │
│   • 卡片刷新     │
│   • 成功反馈     │
└─────────────────┘
```

### 流程3：视图切换体验

```
[用户在Day视图]
       ↓
┌─────────────────┐
│   Day视图       │ ← 时间轴展示，详细信息
│   • 时间线       │
│   • 详细事件     │
│   • 空隙显示     │
└─────────────────┘
       ↓ (点击Week标签)
┌─────────────────┐
│   切换动画       │ ← 平滑过渡，保持上下文
│   • 淡出Day     │
│   • 缩放效果     │
│   • 淡入Week    │
└─────────────────┘
       ↓
┌─────────────────┐
│   Week视图      │ ← 7天网格，紧凑展示
│   • 周视图网格   │
│   • 事件概览     │
│   • 快速导航     │
└─────────────────┘
       ↓ (点击Month标签)
┌─────────────────┐
│   切换动画       │ ← 渐进式展示
│   • 淡出Week    │
│   • 网格重排     │
│   • 淡入Month   │
└─────────────────┘
       ↓
┌─────────────────┐
│   Month视图     │ ← 月历网格，密度最高
│   • 日历网格     │
│   • 事件点表示   │
│   • 月份导航     │
└─────────────────┘

智能状态保持：
├── 选中日期跨视图保持
├── 滚动位置智能对应
├── 筛选条件全局保持
└── 编辑状态无缝衔接
```

---

## 🎭 微交互设计

### 悬浮状态 (Hover States)

```css
/* 日程卡片悬浮 */
.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 按钮悬浮 */
.button-primary:hover {
  background: #0056CC;
  transform: scale(1.02);
  transition: all 0.15s ease-out;
}

/* 标签切换悬浮 */
.tab-item:hover {
  background: rgba(0, 122, 255, 0.1);
  border-radius: 22px;
  transition: all 0.2s ease-out;
}
```

### 点击反馈 (Touch Feedback)

```css
/* 触摸按下效果 */
.touchable:active {
  transform: scale(0.96);
  transition: transform 0.1s ease-out;
}

/* 日程卡片点击 */
.event-card:active {
  transform: translateY(-1px) scale(0.98);
  transition: all 0.1s ease-out;
}

/* 快速弹性恢复 */
.touchable:not(:active) {
  transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### 状态切换动画

```css
/* 视图切换 */
.view-transition {
  animation: viewFade 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes viewFade {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* 模态框出现 */
.modal-enter {
  animation: modalSlideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes modalSlideUp {
  0% { 
    opacity: 0; 
    transform: translateY(100px) scale(0.9);
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) scale(1);
  }
}
```

### 加载状态

```css
/* 骨架屏动画 */
.skeleton {
  background: linear-gradient(
    90deg,
    #F2F2F7 25%,
    #E5E5EA 50%,
    #F2F2F7 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* 成功反馈 */
.success-feedback {
  animation: successPulse 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes successPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

---

## 📱 响应式适配

### 断点系统

```css
/* 移动设备优先 */
.container {
  padding: 16px;
}

/* 平板 768px+ */
@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
  
  .event-card {
    transition: transform 0.2s ease;
  }
  
  .event-card:hover {
    transform: translateY(-4px);
  }
}

/* 桌面 1024px+ */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px;
  }
  
  .sidebar {
    display: block;
    width: 280px;
  }
}

/* 大屏 1440px+ */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
  }
}
```

### 触摸优化

```css
/* 触摸目标最小44pt */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 滑动手势支持 */
.swipeable {
  touch-action: pan-x;
  user-select: none;
}

/* 防止意外缩放 */
.no-zoom {
  touch-action: manipulation;
}
```

---

## 🎨 主题适配

### 深色模式

```css
/* 自动适配系统偏好 */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #000000;
    --background-secondary: #1C1C1E;
    --background-tertiary: #2C2C2E;
    --label: #FFFFFF;
    --label-secondary: rgba(255, 255, 255, 0.6);
    --separator: rgba(255, 255, 255, 0.1);
    --blue: #0A84FF;
    --green: #30D158;
    --orange: #FF9F0A;
    --red: #FF453A;
  }
  
  .event-card {
    background: var(--background-secondary);
    border-color: var(--separator);
  }
  
  .modal {
    background: var(--background-tertiary);
    backdrop-filter: blur(20px);
  }
}
```

### 动态颜色

```css
/* 自适应强调色 */
:root {
  --accent-color: #007AFF;
  --accent-hover: #0056CC;
  --accent-light: rgba(0, 122, 255, 0.1);
}

/* 基于用户偏好调整 */
@media (prefers-color-scheme: dark) {
  :root {
    --accent-color: #0A84FF;
    --accent-hover: #409CFF;
    --accent-light: rgba(10, 132, 255, 0.2);
  }
}
```

---

## 🔧 技术实现指南

### 关键CSS类

```css
/* 基础布局 */
.app-container {
  max-width: 100vw;
  min-height: 100vh;
  background: var(--background);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
}

.main-content {
  padding: env(safe-area-inset-top) 16px env(safe-area-inset-bottom) 16px;
}

/* 卡片组件 */
.card {
  background: var(--background-secondary);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--separator);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 按钮组件 */
.btn-primary {
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0) scale(0.96);
}
```

### React组件结构

```typescript
// 组件层次结构
ScheduleBuilderApp/
├── Header/
│   ├── Navigation
│   ├── SearchBar
│   └── UserProfile
├── MainContent/
│   ├── ViewToggle
│   ├── TimelineView
│   ├── CalendarGrid
│   └── EventList
├── EventCard/
│   ├── EventHeader
│   ├── EventDetails
│   └── EventActions
├── CreateModal/
│   ├── EventForm
│   ├── DateTimePicker
│   └── FormActions
└── QuickActions/
    ├── TemplateButtons
    └── ShortcutMenu
```

---

## 📏 可访问性标准

### WCAG 2.1 AA 合规

```css
/* 颜色对比度 */
.text-primary { 
  color: #000000; /* 21:1 对比度 */
}

.text-secondary { 
  color: #3C3C43; /* 4.5:1 对比度 */
}

/* 焦点指示器 */
.focusable:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* 动画偏好 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 语义化HTML

```html
<!-- 正确的语义结构 -->
<main role="main" aria-label="Schedule Builder">
  <section aria-label="Daily Schedule">
    <h2>Today's Events</h2>
    <article 
      role="button" 
      tabindex="0"
      aria-label="Product Review Meeting, 8:00 AM to 9:00 AM"
      onclick="openEvent()"
      onkeydown="handleKeyDown(event)"
    >
      <h3>Product Review Meeting</h3>
      <time datetime="2024-03-16T08:00">8:00 AM</time>
      <span aria-label="Duration">60 minutes</span>
    </article>
  </section>
</main>
```

---

这个设计规范为Apple风格的ScheduleBuilder提供了完整的设计语言和实现指导。每个组件都经过精心设计，确保既美观又实用，符合Apple的设计哲学。

你希望我详细展开其中某个部分，或者开始实际的代码实现吗？