import { Env } from '@stencil/core';

export const resources = (
  env: string,
): {
  server: string;
  feeder: string;
} => {
  switch (env) {
    case 'local':
      return {
        server: `http://localhost:3000`,
        feeder: `http://localhost:3001`,
      };
    case 'prod':
      return {
        server: `https://servant.railz.ai`,
        feeder: `https://api.railz.ai`,
      };

    default:
      return {
        server: `https://servant.${env}.railz.ai`,
        feeder: `https://api.${env}.railz.ai`,
      };
  }
};
export const apis = resources(Env.apiEnv);
