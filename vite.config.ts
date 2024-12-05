import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import path, { resolve } from 'path'
import { globSync } from 'glob'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [
    dts({
      exclude: ['./src/test', './src/modules/**/*.test.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
    },
    emptyOutDir: true,
    sourcemap: true,
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
      },
    },
  },
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/modules/**/*.test.ts',
        'src/test/*.ts',
        '.eslintrc.cjs',
        'src/index.ts',
        'src/**/*.d.ts',
      ],
    },
  },
})
