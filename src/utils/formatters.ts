/**
 * Formats a number as currency in a specified locale.
 * @param number - The number to format
 * @param string - The currency code
 * @param string - The locale code
 * @returns The formatted currency string
 */
export const formatCurrency = (value: number, currency: string = 'USD', locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

/**
 * Formats a date string, number, or Date object into a specified locale format.
 * @param date - The date string, number, or Date object to format
 * @param locale - The locale code
 * @returns The formatted date string
 */
export const formatDate = (date: string | number | Date, locale: string = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(typeof date === 'string' || typeof date === 'number' ? new Date(date) : date);
};