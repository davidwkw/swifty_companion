declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_FT_API_ROUTE: string;
    USER_DETAILS_ROUTE: string;
    ID: string;
    SECRET: string;
    FT_API_TOKEN_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
