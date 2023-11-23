import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

export const requestTimeout = 7000;

export interface FtToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  created_at: number;
  secret_valid_until: number;
}

const requestFtApiToken = async (): Promise<FtToken> => {
  try {
    const response = await ftApi.post<FtToken>('/oauth/token', {
      grant_type: 'client_credentials',
      client_id: Config.ID,
      client_secret: Config.SECRET,
    });
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

const ftApi: AxiosInstance = axios.create({
  baseURL: Config.BASE_FT_API_ROUTE,
  timeout: requestTimeout,
});

ftApi.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    let token = await EncryptedStorage.getItem(Config.FT_API_TOKEN_KEY);
    if (token) {
      const tokenObject: FtToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${tokenObject.access_token}`;
    }
    return config;
  },
  (error: unknown): void => {
    Promise.reject(error);
  },
);

type InternalAxiosConfigWithRetry = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

ftApi.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: unknown): Promise<AxiosResponse> => {
    if (error instanceof AxiosError) {
      const originalConfig = error.config as InternalAxiosConfigWithRetry;
      if (error.response?.status === 401 && !originalConfig?._retry) {
        originalConfig._retry = true;
        const token = await requestFtApiToken();
        await EncryptedStorage.setItem(
          Config.FT_API_TOKEN_KEY,
          JSON.stringify(token),
        );
        ftApi.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
        return ftApi(originalConfig as AxiosRequestConfig);
      }
    }
    return Promise.reject(error);
  },
);

export default ftApi;
