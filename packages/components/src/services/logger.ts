import Config from '../config';

export const warnLog = (...data: any[]) => {
  console.warn(data);
}

export const debugLog = (...data: any[]) => {
  if (Config.DEBUG) {
    console.debug(data);
  }
}

export const errorLog = (...data: any[]) => {
  if (Config.DEBUG) {
    console.error(data);
  }
}

export const infoLog = (...data: any[]) => {
  if (Config.DEBUG) {
    console.log(data);
  }
}
