// TailwindCSS 特定的 ESLint 规则和最佳实践
module.exports = {
  // 自定义规则用于 TailwindCSS 最佳实践
  rules: {
    // 检查常见的 TailwindCSS 类名错误
    'tailwind/no-contradicting-classname': 'error',
    'tailwind/no-custom-classname': 'warn',
    'tailwind/classnames-order': 'warn',
  },
  
  // 自定义规则实现
  plugins: ['tailwind-custom'],
  
  // 环境特定配置
  overrides: [
    {
      files: ['src/components/ui/**/*.{ts,tsx}'],
      rules: {
        // UI 组件应该使用 TailwindCSS 类而不是内联样式
        'react/forbid-dom-props': [
          'error',
          {
            forbid: ['style'],
            message: 'Use TailwindCSS classes instead of inline styles',
          },
        ],
        
        // 确保组件有合适的 className prop
        'react/require-default-props': 'off',
      },
    },
  ],
};

// 自定义 ESLint 规则实现
const customRules = {
  // 检查矛盾的 TailwindCSS 类名
  'no-contradicting-classname': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow contradicting TailwindCSS class names',
        category: 'Best Practices',
      },
      schema: [],
    },
    create(context) {
      const contradictingClasses = {
        // 显示相关
        'block': ['hidden', 'inline', 'inline-block', 'flex', 'grid'],
        'hidden': ['block', 'inline', 'inline-block', 'flex', 'grid'],
        'flex': ['block', 'hidden', 'inline', 'inline-block', 'grid'],
        'grid': ['block', 'hidden', 'inline', 'inline-block', 'flex'],
        
        // 定位相关
        'static': ['relative', 'absolute', 'fixed', 'sticky'],
        'relative': ['static', 'absolute', 'fixed', 'sticky'],
        'absolute': ['static', 'relative', 'fixed', 'sticky'],
        'fixed': ['static', 'relative', 'absolute', 'sticky'],
        'sticky': ['static', 'relative', 'absolute', 'fixed'],
        
        // 浮动相关
        'float-left': ['float-right', 'float-none'],
        'float-right': ['float-left', 'float-none'],
        'float-none': ['float-left', 'float-right'],
      };
      
      return {
        JSXAttribute(node) {
          if (node.name.name === 'className' && node.value) {
            const classNames = getClassNames(node.value);
            checkContradictingClasses(classNames, contradictingClasses, context, node);
          }
        },
      };
    },
  },
  
  // 检查自定义类名的使用
  'no-custom-classname': {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Warn about custom class names that might have TailwindCSS equivalents',
        category: 'Best Practices',
      },
      schema: [],
    },
    create(context) {
      const commonCustomClasses = [
        'container',
        'wrapper',
        'content',
        'main',
        'sidebar',
        'header',
        'footer',
        'nav',
        'menu',
      ];
      
      return {
        JSXAttribute(node) {
          if (node.name.name === 'className' && node.value) {
            const classNames = getClassNames(node.value);
            classNames.forEach(className => {
              if (commonCustomClasses.includes(className)) {
                context.report({
                  node,
                  message: `Consider using TailwindCSS utilities instead of custom class "${className}"`,
                });
              }
            });
          }
        },
      };
    },
  },
};

// 辅助函数
function getClassNames(valueNode) {
  if (valueNode.type === 'Literal') {
    return valueNode.value.split(/\s+/).filter(Boolean);
  }
  return [];
}

function checkContradictingClasses(classNames, contradictingClasses, context, node) {
  classNames.forEach(className => {
    if (contradictingClasses[className]) {
      const contradicting = contradictingClasses[className].filter(c => 
        classNames.includes(c)
      );
      if (contradicting.length > 0) {
        context.report({
          node,
          message: `Contradicting TailwindCSS classes: "${className}" conflicts with "${contradicting.join(', ')}"`,
        });
      }
    }
  });
}

module.exports.rules = customRules;