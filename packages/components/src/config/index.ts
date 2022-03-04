const config = {
  get SERVER_URL(): string {
    return process.env.RAILZ_API_HOST;
  },
  get NODE_ENV(): string {
    return process.env.NODE_ENV;
  },
  get DEBUG(): boolean {
    return process.env.NODE_ENV !== "production";
  },
};
export default config;
