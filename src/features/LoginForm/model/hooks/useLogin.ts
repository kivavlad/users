import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { TOKEN_KEY } from '@shared/constants/auth';
import { RoutePath } from '@shared/constants/urls';
import useAlert from '@shared/hooks/useAlert';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { isError } from '@shared/lib/utils/isError';

import { loginService } from '../login.service';

import type { FormValues } from '../../lib/schema';

export const useLogin = () => {
  const navigate = useNavigate();
  const { set } = useLocalStorage();
  const alert = useAlert();

  return useMutation({
    mutationFn: (values: FormValues) => loginService.loginRequest(values),
    onSuccess: (token: string) => {
      set(TOKEN_KEY, token);
      navigate(RoutePath.ROOT, { replace: true });
    },
    onError: (err) => {
      isError(err) && alert.error(err.message);
    },
  });
};
