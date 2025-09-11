import { createFilter, FilterPattern } from '@rollup/pluginutils'
import fs from 'fs'
import esbuild from 'esbuild'
import type { Plugin } from 'rollup'
import type { Plugin as VitePlugin } from 'vite'
import type { Config } from '@svgr/core'

interface RollupPluginSvgrOptions {
  svgrOptions?: Config
  esbuildOptions?: esbuild.TransformOptions
  exclude?: FilterPattern
  include?: FilterPattern
}

function rollupPluginSvgr({ esbuildOptions, svgrOptions, include = '**/*.svg?react', exclude }: RollupPluginSvgrOptions = {}): Plugin & VitePlugin {
  const filter = createFilter(include, exclude)
  const postfixRE = /[?#].*$/
  return {
    name: 'rollup-plugin-svgr',
    enforce: "pre", // to override `vite:asset`'s behavior
    async load(id) {
      if (filter(id)) {
        const { transform } = await import('@svgr/core')
        const { default: jsx } = await import('@svgr/plugin-jsx')
        const filePath = id.replace(postfixRE, '')
        const svgCode = await fs.promises.readFile(filePath, 'utf8')
        const componentCode = await transform(svgCode, svgrOptions, {
          filePath,
          caller: {
            defaultPlugins: [jsx],
          },
        })
        const res = await esbuild.transform(componentCode, {
          loader: 'jsx',
          sourcefile: id,
          ...esbuildOptions,
        })
        return {
          code: res.code,
          map: null, // TODO:
        }
      }
    },
  }
}

export default rollupPluginSvgr