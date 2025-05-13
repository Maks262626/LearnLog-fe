import { Dayjs } from 'dayjs';

export const getPreviousMonday = (date: Dayjs): Dayjs => {
  const dayOfWeek = date.day();
  const diff = (dayOfWeek + 6) % 7;
  return date.subtract(diff, 'day').startOf('day');
};

export const getStartEndWeekDates = (date: Dayjs): [string, string] => {
  const startDate = getPreviousMonday(date).format('YYYY-MM-DD');
  const endDate = getPreviousMonday(date).add(6, 'day').format('YYYY-MM-DD');
  return [startDate, endDate];
};
