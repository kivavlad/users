import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { RoutePath } from '@shared/constants/urls';
import { TOKEN_KEY } from '@features/LoginForm/model/constants';
import { Loader } from '@shared/ui/Loader';

interface IProps {
  children?: React.ReactNode;
}

export const RequireAuth: React.FC = ({ children }: IProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { get } = useLocalStorage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = get(TOKEN_KEY);
      const isAuth = Boolean(token);
      const isLoginPage = location.pathname === RoutePath.LOGIN;
      
      if (isLoginPage && isAuth) {
        void navigate(RoutePath.ROOT, { replace: true });
      } else if (!isLoginPage && !isAuth) {
        void navigate(RoutePath.LOGIN, { replace: true });
      }
      
      setIsLoading(false);
    };

    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [location.pathname, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};