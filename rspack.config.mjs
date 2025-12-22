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

export default Repack.defineRspackConfig({
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
        './App': './App.tsx'
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-native': { singleton: true, eager: true },
      },
      dts: false
    })
  ],
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 3011,
  //   https: true,
  //   allowedHosts: 'all',
  //   client: {
  //     webSocketURL: 'ws://localhost:3011/ws',
  //   },
  //   server: 'https'
  // },
});
