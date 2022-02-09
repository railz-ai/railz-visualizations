import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import dotenv from 'rollup-plugin-dotenv';

const getEnvParam = (param: string): boolean => process?.argv?.indexOf(param) > -1;
let apiEnv: string = '';
if (getEnvParam('--local')) {
  apiEnv = 'local';
} else if (getEnvParam('--qa')) {
  apiEnv = 'qa';
} else if (getEnvParam('--qa2')) {
  apiEnv = 'qa2';
} else if (getEnvParam('--stage')) {
  apiEnv = 'stage';
} else if (getEnvParam('--prod')) {
  apiEnv = 'prod';
}

export const config: Config = {
  env: {
    apiEnv,
  },
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
