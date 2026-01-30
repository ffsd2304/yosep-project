import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/kakao'로 시작하는 요청을 카카오 서버로 보냄
      '/kakao': {
        target: 'https://dapi.kakao.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kakao/, ''),
        secure: false,
      },
    },
  },
})