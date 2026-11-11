import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Lets the dev preview load the launch illustration from the block's static files.
    publicDir: '../flashcards_prototype/public/images',
    // The design system is linked from outside this folder (its fonts are served from there).
    server: {
        fs: {
            allow: ['.', '../../exemplar-design-system'],
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'student.html'),
                studio: resolve(__dirname, 'studio.html'),
            }
        }
    },
    resolve: {
        dedupe: ['react', 'react-dom'],
        alias: [
            {
                // this is required for the SCSS modules
                find: /^~(.*)$/,
                replacement: '$1',
            },
        ],
    },
})
