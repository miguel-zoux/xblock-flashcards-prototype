/// <reference types="vitest" />
import {resolve} from 'path';
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {browserslistToTargets} from "lightningcss";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    let lib = 'student-ui';
    let libName = 'FlashcardsPrototypeBlock';
    if (process.env.COMPONENT === 'studio-ui') {
        lib = 'studio-ui';
        libName = 'FlashcardsPrototypeEditor';
    }
    return {
        base: "",
        // The block's Python package serves its own static files; don't copy anything extra.
        publicDir: false,
        build: {
            outDir: '../flashcards_prototype/public',
            lib: {
                entry: resolve(__dirname, `src/${lib}/index.tsx`),
                name: libName,
                fileName: lib,
                formats: ["es"]
            },
            rollupOptions: {
                output: {
                    chunkFileNames: '[name].js',
                    assetFileNames: `${lib}[extname]`,
                }
            },
        },
        define: {'process.env.NODE_ENV': '"production"'},
        plugins: [react()],
        resolve: {
            // The design system is linked from ../../exemplar-design-system and has its own
            // node_modules; make sure there is only one React.
            dedupe: ['react', 'react-dom'],
            alias: [
                {
                    // this is required for the SCSS modules
                    find: /^~(.*)$/,
                    replacement: '$1',
                },
            ],
        },
        test: {},
    };
})
