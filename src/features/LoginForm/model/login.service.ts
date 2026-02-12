import type { LoginCredentials } from "./types";
import { UserData, TOKEN_KEY } from './constants';

class LoginService {
  async loginRequest({ login, password }: LoginCredentials) {
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

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const loginService = new LoginService();
