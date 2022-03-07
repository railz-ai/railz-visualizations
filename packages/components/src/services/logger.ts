import { ConfigurationInstance } from './configuration';

export const warnLog = (...data: any[]): void => {
  if (ConfigurationInstance.configuration?.debug) {
    console.warn(data);
  }
};

export const debugLog = (...data: any[]): void => {
  if (ConfigurationInstance.configuration?.debug) {
    console.debug(data);
  }
};

export const errorLog = (...data: any[]): void => {
  if (ConfigurationInstance.configuration?.debug) {
    console.error(data);
  }
};

export const infoLog = (...data: any[]): void => {
  if (ConfigurationInstance.configuration?.debug) {
    console.log(data);
  }
};
