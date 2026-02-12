import { useCallback } from 'react';

export const useLocalStorage = () => {
  const get = useCallback((key: string) => {
    return localStorage.getItem(key);
  }, []);

  const set = useCallback((key: string, value: string) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event('storage'));
  }, []);

  const remove = useCallback((key: string) => {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event('storage'));
  }, []);

  return { get, set, remove };
};
