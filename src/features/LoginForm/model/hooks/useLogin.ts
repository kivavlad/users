import { useMutation } from '@tanstack/react-query';

import { TOKEN_KEY } from '@shared/constants/auth';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';

import { loginService } from '../login.service';

import type { FormValues } from '../../lib/schema';

export const useLogin = () => {
  const { set } = useLocalStorage();

  return useMutation({
    mutationFn: (values: FormValues) => loginService.loginRequest(values),
    onSuccess: (token: string) => {
      set(TOKEN_KEY, token);
    },
  });
};
