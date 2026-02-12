import api from "@shared/api/api";
import type { IUser } from "@shared/types/user.types";

class EditUserService {
  async getUserById(id: string) {
    return await api.get<IUser>(`/users/${id}`);
  }
  async editUser(data: IUser) {
    return await api.put<IUser>(`/users/${data.id}`, data);
  }
  async removeUser(id: string) {
    return await api.delete<IUser>(`/users/${id}`);
  }
};

export const editUserService = new EditUserService();
