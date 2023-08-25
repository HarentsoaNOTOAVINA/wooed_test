/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = Object.assign(process.env,loadEnv(mode, process.cwd()));
    // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return defineConfig({
        server: {
            port: 3002,
            proxy: {
                //need this for solving CORS issue
                //change localhost:3002/pdfImmo to http://back-immov2.dev73/pdfImmo
                '^/pdfImmo': {
                    target: process.env.VITE_API_ROOT_URL+"/uploads/permit/citerne/",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/pdfImmo/, '')

                },
                '^/pdflocation': {
                    target: process.env.VITE_API_ROOT_URL,
                    changeOrigin: true,
                    rewrite: (path) =>path.replace(/^\/pdflocation/, '')

                },
                '^/finance': {
                    target: 'https://gateway.my-preprod.space/api/immo/v2/calcul/new_sales',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/finance/, '')
                },

                // to solve mangopay-cardregistration-js-kit CORS issue
                '^/mangopay': {
                    target: 'https://api.sandbox.mangopay.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/mangopay/, '')
                },
                '^/uploads': {
                    target: process.env.VITE_API_ROOT_URL,
                    changeOrigin: true,
                    secure: false,
                },
                '^/upload/controls': {
                    target: process.env.VITE_API_ROOT_URL,
                    changeOrigin: true,
                    secure: false,
                },
                '^/map_wallonie': {
                    target: "http://geoservices.wallonie.be",
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/map_wallonie/, '')
                },

            },
        },
        
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        build: {
            commonjsOptions: {
                esmExternals: true,
            },
        },
        // @ts-ignore
        test: {
            environment: 'happy-dom',
            global: true,
        },
        rollupInputOptions: {
            external: ['@turf/turf', 'mangopay-cardregistration-js-kit'],
        },
    });
};