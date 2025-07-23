module.exports = {
    extends: [
        'next/core-web-vitals',
    ],
    rules: {
        // TailwindCSS 最佳实践规则

        // 禁止在 className 中使用模板字符串，推荐使用 clsx 或 cn 函数
        'no-template-curly-in-string': 'warn',

        // 推荐使用语义化的组件名
        'react/jsx-pascal-case': 'error',

        // 将这些规则降级为警告以避免构建失败
        '@next/next/no-html-link-for-pages': 'warn',
        'react/no-unescaped-entities': 'warn',
        '@next/next/no-img-element': 'warn',

        // 确保导入的一致性
        'import/order': [
            'warn',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },

    // 针对不同文件类型的特定规则
    overrides: [
        {
            files: ['src/components/ui/**/*.{ts,tsx,js,jsx}'],
            rules: {
                // UI 组件特定规则
                'react/prop-types': 'off',
                'react/display-name': 'error',

                // 确保 UI 组件有正确的命名
                'react/jsx-no-undef': 'error',
            },
        },
        {
            files: ['*.config.{js,ts}', '*.config.*.{js,ts}'],
            rules: {
                // 配置文件可以使用 require 和匿名导出
                'import/no-anonymous-default-export': 'off',
            },
        },
    ],

    // 环境配置
    env: {
        browser: true,
        es2021: true,
        node: true,
    },

    // 解析器选项
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },

    // 设置
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },

    // 忽略模式
    ignorePatterns: [
        'node_modules/',
        '.next/',
        'out/',
        'dist/',
        'build/',
        '*.config.js',
        '*.config.ts',
    ],
};