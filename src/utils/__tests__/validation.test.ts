import { describe, expect, it } from 'vitest';
import { validateAccountNumberMod11 } from '../validation';

describe('validateAccountNumberMod11', () => {
  it('should return false if account number is not provided', () => {
    const result = validateAccountNumberMod11();
    expect(result).toBe(false);
  });

  it('should return false if account number length is not 11', () => {
    const result = validateAccountNumberMod11('1234567890');
    expect(result).toBe(false);
  });

  it('should return true if account number is valid', () => {
    const result = validateAccountNumberMod11('12345678903');
    expect(result).toBe(true);
  });

  it('should return false if account number is invalid', () => {
    const result = validateAccountNumberMod11('12345678902');
    expect(result).toBe(false);
  });
});
