import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget as angular } from '@stencil/angular-output-target';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import dotEnvConfig from 'rollup-plugin-dotenv';

export const config: Config = {
  namespace: 'RailzVisualizations',
  globalStyle: 'src/global/global.scss',
  sourceMap: true,
  outputTargets: [
    angular({
      componentCorePackage: `@railzai/railz-visualizations`,
      directivesProxyFile: `../components-angular/src/lib/stencil-generated/components.ts`,
      directivesArrayFile: `../components-angular/src/lib/stencil-generated/index.ts`,
    }),
    react({
      componentCorePackage: '@railzai/railz-visualizations',
      proxiesFile: '../components-react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
      loaderDir: 'dist/loader',
    }),
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/global.scss'],
    }),
    dotEnvConfig(),
  ],
  testing: {
    moduleNameMapper: {
      'lodash-es': 'lodash',
    },
    transformIgnorePatterns: ['./node_modules/(?!lodash-es)'],
  },
};
