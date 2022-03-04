import Config from "../config";

export const warnLog = (...data: any[]): void => {
  if (Config.DEBUG) {
    console.warn(data);
  }
};

export const debugLog = (...data: any[]): void => {
  if (Config.DEBUG) {
    console.debug(data);
  }
};

export const errorLog = (...data: any[]): void => {
  if (Config.DEBUG) {
    console.error(data);
  }
};

export const infoLog = (...data: any[]): void => {
  if (Config.DEBUG) {
    console.log(data);
  }
};
