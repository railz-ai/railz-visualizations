export interface RVConfiguration {
  /**
   * configuration: To authenticate your application, specify an access configuration
   */
  token: string;

  /**
   * endpoint:
   * @internal
   */
  endpoint?: string;

  /**
   * debug: use to print out logs
   */
  debug?: boolean;
}
