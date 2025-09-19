import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const TZ = 'America/Santiago';

export const getStartOfDay = (): Date => {
  return dayjs().tz(TZ).startOf('day').toDate();
};

export const getEndOfDay = (): Date => {
  return dayjs().tz(TZ).add(1, 'day').startOf('day').toDate();
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return dayjs(date1).isSame(dayjs(date2), 'day');
};

export const formatDate = (date: Date, format: string): string => {
  return dayjs(date).tz(TZ).format(format);
};
