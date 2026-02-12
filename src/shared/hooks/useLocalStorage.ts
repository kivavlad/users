export const useLocalStorage = () => {
  const get = (key: string) => {
    return localStorage.getItem(key);
  };

  const set = (key: string, value: string) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event('storage'));
  };

  const remove = (key: string) => {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event('storage'));
  };

  return { get, set, remove };
};