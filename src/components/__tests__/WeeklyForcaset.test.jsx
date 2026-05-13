import { describe, it, expect } from 'vitest';
import { getWeatherInfo } from '../WeeklyForcaset';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudHail
} from 'lucide-react';

describe('getWeatherInfo', () => {
  it('returns Clear sky for code 0', () => {
    const result = getWeatherInfo(0);
    expect(result.icon.type).toBe(Sun);
    expect(result.label).toBe('Clear sky');
  });

  it('returns Mainly clear for code 1', () => {
    const result = getWeatherInfo(1);
    expect(result.icon.type).toBe(CloudSun);
    expect(result.label).toBe('Mainly clear');
  });

  it('returns Partly cloudy for code 2', () => {
    const result = getWeatherInfo(2);
    expect(result.icon.type).toBe(CloudSun);
    expect(result.label).toBe('Partly cloudy');
  });

  it('returns Overcast for code 3', () => {
    const result = getWeatherInfo(3);
    expect(result.icon.type).toBe(Cloud);
    expect(result.label).toBe('Overcast');
  });

  it('returns Fog for codes 45 and 48', () => {
    [45, 48].forEach(code => {
      const result = getWeatherInfo(code);
      expect(result.icon.type).toBe(CloudFog);
      expect(result.label).toBe('Fog');
    });
  });

  it('returns Drizzle for codes 51, 53, 55', () => {
    [51, 53, 55].forEach(code => {
      const result = getWeatherInfo(code);
      expect(result.icon.type).toBe(CloudDrizzle);
      expect(result.label).toBe('Drizzle');
    });
  });

  it('returns Rain for codes 56, 57, 61, 63, 65', () => {
    [56, 57, 61, 63, 65].forEach(code => {
      const result = getWeatherInfo(code);
      expect(result.icon.type).toBe(CloudRain);
      expect(result.label).toBe('Rain');
    });
  });

  it('returns Freezing rain for codes 66, 67', () => {
    [66, 67].forEach(code => {
      const result = getWeatherInfo(code);
      expect(result.icon.type).toBe(CloudHail);
      expect(result.label).toBe('Freezing rain');
    });
  });

  it('returns Snow for codes 71, 73, 75, 77', () => {
    [71, 73, 75, 77].forEach(code => {
      const result = getWeatherInfo(code);
      expect(result.icon.type).toBe(CloudSnow);
      expect(result.label).toBe('Snow');
    });
  });

  it('returns Showers for codes 80, 81, 82', () => {
    [80, 81, 82].forEach(code => {
      const result = getWeatherInfo(code);
      expect(result.icon.type).toBe(CloudRain);
      expect(result.label).toBe('Showers');
    });
  });

  it('returns Snow showers for codes 85, 86', () => {
    [85, 86].forEach(code => {
      const result = getWeatherInfo(code);
      expect(result.icon.type).toBe(CloudSnow);
      expect(result.label).toBe('Snow showers');
    });
  });

  it('returns Thunderstorm for codes 95, 96, 99', () => {
    [95, 96, 99].forEach(code => {
      const result = getWeatherInfo(code);
      expect(result.icon.type).toBe(CloudLightning);
      expect(result.label).toBe('Thunderstorm');
    });
  });

  it('returns Default Cloud for unknown codes', () => {
    const result = getWeatherInfo(999);
    expect(result.icon.type).toBe(Cloud);
    expect(result.label).toBe('Cloud');
  });
});
