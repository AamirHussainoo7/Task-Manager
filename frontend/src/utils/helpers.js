import { format, formatDistanceToNow, isToday, isTomorrow, isPast, parseISO } from 'date-fns';

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, 'MMM d, yyyy');
}

export function formatRelativeDate(dateString) {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return formatDistanceToNow(date, { addSuffix: true });
}

export function getDueDateStatus(dateString) {
  if (!dateString) return null;
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  if (isPast(date) && !isToday(date)) return 'overdue';
  if (isToday(date)) return 'today';
  if (isTomorrow(date)) return 'tomorrow';
  return 'upcoming';
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
