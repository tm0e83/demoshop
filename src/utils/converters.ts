/**
 * Converts a number (0-255) to a two-digit hexadecimal string.
 * @param value - The number to convert
 * @returns The two-digit hexadecimal string
 */
export const toHex = (value: number): string => {
  const hex = parseInt(value.toString()).toString(16).toUpperCase();
  return hex.padStart(2, '0');
};