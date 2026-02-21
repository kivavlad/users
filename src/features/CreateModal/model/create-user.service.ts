import api from '@shared/api/api';

import type { FormValues } from '../lib/schema';
import type { IUser } from '@shared/types/user.types';

class CreateUserService {
  async createUser(values: FormValues) {
    return await api.post<IUser>('/users', values);
  }
}

export const createUserService = new CreateUserService();
