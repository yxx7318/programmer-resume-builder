import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src', // 设置别名 '@' 指向 'src' 目录
    },
  },
  base: '/', // publicPath
  plugins: [vue()],
})
