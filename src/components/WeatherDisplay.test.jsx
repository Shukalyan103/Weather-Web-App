import { describe, it, expect, vi } from 'vitest';
import { uvIndex } from './WeatherDisplay';

describe('uvIndex', () => {
  it('should return LOW for UV index <= 2', () => {
    expect(uvIndex(0)).toBe('LOW');
    expect(uvIndex(1)).toBe('LOW');
    expect(uvIndex(2)).toBe('LOW');
  });

  it('should return MODERATE for UV index > 2 and <= 5', () => {
    expect(uvIndex(3)).toBe('MODERATE');
    expect(uvIndex(4)).toBe('MODERATE');
    expect(uvIndex(5)).toBe('MODERATE');
  });

  it('should return HIGH for UV index > 5 and <= 7', () => {
    expect(uvIndex(6)).toBe('HIGH');
    expect(uvIndex(7)).toBe('HIGH');
  });

  it('should return VERY HIGH for UV index >= 8 and <= 10', () => {
    expect(uvIndex(8)).toBe('VERY HIGH');
    expect(uvIndex(9)).toBe('VERY HIGH');
    expect(uvIndex(10)).toBe('VERY HIGH');
  });

  it('should return EXTREME for UV index > 10', () => {
    expect(uvIndex(11)).toBe('EXTREME');
    expect(uvIndex(15)).toBe('EXTREME');
  });

  it('should use the provided decimalFix function', () => {
    const mockDecimalFix = vi.fn().mockReturnValue(5);
    const result = uvIndex(5.5, mockDecimalFix);
    expect(mockDecimalFix).toHaveBeenCalledWith(5.5);
    expect(result).toBe('MODERATE');
  });

  it('should correctly handle string numbers when decimalFix rounds them', () => {
    expect(uvIndex("1.5")).toBe('LOW'); // Math.floor("1.5") = 1
    expect(uvIndex("5.9")).toBe('MODERATE'); // Math.floor("5.9") = 5
    expect(uvIndex("8.1")).toBe('VERY HIGH'); // Math.floor("8.1") = 8
  });
});
