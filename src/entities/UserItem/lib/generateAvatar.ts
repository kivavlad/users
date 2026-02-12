export const generateAvatar = (index: number): string => {
  return `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`;
};
