/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
    resolve: {
        dedupe: ['react', 'react-dom'],
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        server: {
            deps: {
                inline: [
                    // Paragon icons are exported in a format that
                    // node can't handle. This will inline the code so the
                    // tests can run without issue.
                    "@openedx/paragon/icons"
                ]
            }
        },
        coverage: {
            provider: "istanbul",
            include: ["src"],
            exclude: [
                "src/*/dev-preview.ts",
                "src/*/index.tsx",
                "src/studio-ui/TinyMceEditor.tsx",
            ],
        }
    },
})
