import api from '@shared/api/api';
import type { IUser } from '@shared/types/user.types';

import type { FormValues } from '../lib/schema';

class CreateUserService {
  async createUser(values: FormValues) {
    return await api.post<IUser>('/users', values);
  }
}

export const createUserService = new CreateUserService();
