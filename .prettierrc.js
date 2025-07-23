module.exports = {
  // 基础 Prettier 配置
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  
  // TailwindCSS 类名排序插件
  plugins: ['prettier-plugin-tailwindcss'],
  
  // TailwindCSS 插件配置
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
  
  // 文件类型特定配置
  overrides: [
    {
      files: ['*.tsx', '*.ts', '*.jsx', '*.js'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: ['*.css'],
      options: {
        parser: 'css',
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json',
        trailingComma: 'none',
      },
    },
  ],
};