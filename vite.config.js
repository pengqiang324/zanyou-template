import { defineConfig, loadEnv } from 'vite';
const { resolve } = require('path');
import vue from '@vitejs/plugin-vue';
import webpackConfig from './src/config/package.js';

export default ({ mode }) => {
    const isProd = mode === 'production';
    console.log(mode, isProd)
    return defineConfig({
        base: webpackConfig.PUBLIC_PATH,
        publicDir: resolve(__dirname, 'public'),
        assetsInclude: resolve(__dirname, 'src/assets'),
        resolve: {
          // 别名
          alias: {
            '@': resolve(__dirname, 'src'),
          },
        },
        server: {
          port: webpackConfig.PORT,
          proxy: {
            // '/api': {
            //   target: webpackConfig.PROXY_URL,
            //   changeOrigin: true, //是否跨域
            //   rewrite: (path) => path.replace(/^\/api/, ''),
            // },
            [`${loadEnv(mode, process.cwd())}.VITE_APP_BASE_API`]: {
              target: webpackConfig.PROXY_URL,
              changeOrigin: true, //是否跨域
              rewrite: (path) => path.replace(/^\/api/, ''),
            }
          },
        },
        build: {
            outDir: 'dist',
            emptyOutDir: true,
            sourcemap: isProd,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        },
        plugins: [vue()],
      })
};