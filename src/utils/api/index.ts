import axios from 'axios';
import CONFIG from '@/config';
import { handleError } from './utils';

const API_ROUTE = CONFIG.API_URL;

export interface PartialUser {
  id: number;
  username: string;
  creation_timestamp: Date | null;
  registration_timestamp: Date | null;
  is_bot: boolean;
  sex: boolean | undefined;
  groups: {
    current: string[];
    ever_had: string[];
    history: {
      from: Date | null;
      to: Date | null;
      groups: string[];
    }[];
  };
}


export async function getLangs(): Promise<string[]> {
    return handleError<string[]>(async () => {
      const response = await axios.get(`${API_ROUTE}/langs`);
      return response.data;
    });
  }

export async function getUsers(lang: string): Promise<PartialUser[]> {
  return handleError<PartialUser[]>(async () => {
    const response = await axios.get(`${API_ROUTE}/${lang}/users`);
    return response.data;
  });
}

export async function getUser(lang: string, id: number): Promise<any> {
  return handleError<any>(async () => {
    const response = await axios.get(`${API_ROUTE}/${lang}/users/${id}`);
    return response.data;
  });
}