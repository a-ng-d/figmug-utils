import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      exclude: ['./src/test', './src/modules/**/*.test.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es'],
    },
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        globSync(['./src/index.ts', './src/modules/**/*.ts'])
          .filter((file) => !/\.test\.ts$/.test(file))
          .map((file) => {
            const entryName = path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length)
            )
            const entryUrl = fileURLToPath(new URL(file, import.meta.url))
            return [entryName, entryUrl]
          })
      ),
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      include: ['./src/components', './src/modules'],
      exclude: ['./src/stories'],
    },
  },
})
