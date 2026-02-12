import type { IUser } from '@shared/types/user.types';

export type FormValues = Pick<IUser, 'name' | 'avatar'>;
