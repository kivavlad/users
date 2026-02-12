import { useMutation } from '@tanstack/react-query';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { loginService } from '../login.service';
import { LoginCredentials } from '../types';
import { TOKEN_KEY } from '@shared/constants/auth';

export const useLogin = () => {
  const { set } = useLocalStorage();

  return useMutation({
    mutationFn: ({ login, password }: LoginCredentials) => 
      loginService.loginRequest({ login, password }),
    onSuccess: (token: string) => {
      set(TOKEN_KEY, token);
    },
  });
};
