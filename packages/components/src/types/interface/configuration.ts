export interface RVConfiguration {
  /**
   * configuration: To authenticate your application, specify an access configuration
   */
  token: string;

  /**
   * environment: use 'production'
   */
  environment?: string;

  /**
   * debug: use to print out logs
   */
  debug?: boolean;
}
