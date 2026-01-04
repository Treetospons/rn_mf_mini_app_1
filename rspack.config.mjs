import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

const config = (_env) => {

  const isDev = true
  return Repack.defineRspackConfig({
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      clean: true,
      filename: "index.bundle",
      chunkFilename: "[name].chunk.bundle",
      path: "[context]/build/generated/[platform]",
    },
    module: {
      rules: [
        {
          test: /\.[cm]?[jt]sx?$/,
          type: 'javascript/auto',
          use: {
            loader: '@callstack/repack/babel-swc-loader',
            parallel: true,
            options: {},
          },
        },
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'mini_app1',
        filename: "mini_app1.container.bundle",
        exposes: {
          './MiniApp1': './src/App.tsx',
          './MiniApp1Home': './src/views/home/index.tsx',
          './MiniApp1Camera': './src/views/camera/index.tsx',
          './MiniApp1Env': './src/views/env/index.tsx',
        },
        shared: {
          react: { singleton: true, eager: isDev, requiredVersion: '19.1.0' },
          'react-native': { singleton: true, eager: isDev, requiredVersion: '0.80.0' },
          'react-native-screens': { singleton: true, eager: isDev },
          'react-native-safe-area-context': { singleton: true, eager: isDev },
          '@react-native/new-app-screen': { singleton: true, eager: isDev },
          '@react-navigation/native': { singleton: true, eager: isDev },
          '@react-navigation/native-stack': { singleton: true, eager: isDev },
          '@react-navigation/elements': { singleton: true, eager: isDev },
          '@react-navigation/bottom-tabs': { singleton: true, eager: isDev },
          '@react-native-masked-view/masked-view': { singleton: true, eager: isDev },
          'react-native-vision-camera': { singleton: true, eager: isDev },
          'react-native-permissions': { singleton: true, eager: isDev },
          'react-native-config': { singleton: true, eager: isDev },
        },
        dts: false
      })
    ],
  });
}

export default config