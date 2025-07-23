/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态资源优化
  images: {
    unoptimized: true,
  },
  // 禁用React严格模式以避免hydration问题
  reactStrictMode: false,
  // 确保正确的trailing slash配置
  trailingSlash: false,
  // ESLint 配置 - 允许警告但不阻止构建
  eslint: {
    // 在构建时忽略 ESLint 错误
    ignoreDuringBuilds: false,
    // 只在特定目录运行 ESLint
    dirs: ['app', 'src'],
  },
}

module.exports = nextConfig
