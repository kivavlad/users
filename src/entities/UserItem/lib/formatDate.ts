import dayjs from 'dayjs';

export const formatDate = (date: string | Date): string => dayjs(date).format('DD.MM.YYYY');
