import vue from '@vitejs/plugin-vue'
import path from 'path'
import {defineConfig, loadEnv} from 'vite'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import EnhanceLog from 'vite-plugin-enhance-log'

// https://vitejs.dev/config/
export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())}
    return defineConfig({
        plugins: [
            vue(),
            // ElementPlus按需导入
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',
            }),
            EnhanceLog({
                splitBy: ';',
                preTip: '🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀',
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            host: '0.0.0.0',
            port: process.env.VITE_PORT,
            open: false,
        }
    })
}
