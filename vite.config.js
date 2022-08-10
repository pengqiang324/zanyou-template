import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue';
import webpackConfig from './src/config/package.js';

export default ({ mode }) => {
    const isProd = mode.includes('production');
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
          extensions: ['.vue', '.js', '.css', '.jsx', '.json'] // 省略文件后缀名
        },
        server: {
          host: '0.0.0.0', // 配置本地 iP 访问
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
            },
            rollupOptions: {
              // 生成环境js, imge, css文件分离
              output: {
                  // 最小化拆分包
                manualChunks: (id) => {
                  if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                  }
                },
                assetFileNames: assetInfo => {
                  var info = assetInfo.name.split('.')
                  var extType = info[info.length - 1]
                  if (
                    /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
                  ) {
                    extType = 'media'
                  } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
                    extType = 'img'
                  } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
                    extType = 'fonts'
                  }
                  return `${extType}/[name]-[hash][extname]`
                },
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js'
              }
            }
        },
        plugins: [vue()]
      })
};