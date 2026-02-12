import { useMutation } from '@tanstack/react-query';

import { TOKEN_KEY } from '@shared/constants/auth';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';

import { FormValues } from '../../lib/schema';
import { loginService } from '../login.service';

export const useLogin = () => {
  const { set } = useLocalStorage();

  return useMutation({
    mutationFn: (values: FormValues) => loginService.loginRequest(values),
    onSuccess: (token: string) => {
      set(TOKEN_KEY, token);
    },
  });
};
