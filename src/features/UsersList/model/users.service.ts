import api from "@shared/api/api";
import type { IUser } from "@shared/types/user.types";

class UserService {
  async getUsers() {
    return await api.get<IUser[]>('/users');
  }
};

export const userService = new UserService();
