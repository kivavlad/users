import { UserData } from '@shared/constants/auth';

import type { FormValues } from '../lib/schema';

class LoginService {
  async loginRequest({ login, password }: FormValues) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (login === UserData.LOGIN && password === UserData.PASSWORD) {
          const token = Date.now().toString();
          resolve(token);
        } else {
          reject(new Error('Неверный логин или пароль'));
        }
      }, 2000);
    });
  }
}

export const loginService = new LoginService();
