import api from '@shared/api/api';
import type { IUser } from '@shared/types/user.types';

class EditUserService {
  async getUserById(id: string) {
    return await api.get<IUser>(`/users/${id}`);
  }
  async editUser(user: IUser) {
    return await api.put<IUser>(`/users/${user.id}`, user);
  }
  async removeUser(id: string) {
    return await api.delete<IUser>(`/users/${id}`);
  }
}

export const editUserService = new EditUserService();
