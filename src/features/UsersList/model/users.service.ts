import api from "@shared/api/api";
import type { IUser } from "@shared/types/user.types";

class UserService {
  async getUsers() {
    return await api.get<IUser[]>('/users');
  }
  async getUserById(id: string) {
    return await api.get<IUser>(`/users/${id}`);
  }
  async updateUser(id: string) {
    return await api.put<IUser>(`/users/${id}`);
  }
};

export const userService = new UserService();
