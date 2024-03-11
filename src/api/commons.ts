import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '@/config';

export const getReq = async <T>(url: string, config?: AxiosRequestConfig) =>
  await axios.get<T>(`${API_URL}${url}`, config).then((res) => res.data);

export const postReq = async <T, R>(url: string, body: T, config?: AxiosRequestConfig) =>
  await axios.post<R>(`${API_URL}${url}`, body, config).then((res) => res.data);

export const deleteReq = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  await axios.delete<T>(`${API_URL}${url}`, config);
