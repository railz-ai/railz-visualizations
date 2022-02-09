import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import dotenv from 'rollup-plugin-dotenv';

export const config: Config = {
  namespace: 'stencilcomponent',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [sass(), dotenv()],
};
