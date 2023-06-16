import { RVConfiguration } from '../types';

class ConfigurationService {
  private _configuration: RVConfiguration;

  get configuration(): RVConfiguration {
    return this._configuration;
  }
  set configuration(value: RVConfiguration) {
    this._configuration = value;
  }
}
export const ConfigurationInstance = new ConfigurationService();
