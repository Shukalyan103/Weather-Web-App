import { render } from '@testing-library/react';
import { weatherIcon } from './AppContext';
import { describe, it, expect } from 'vitest';

describe('weatherIcon utility function', () => {
  it('should return CloudFog component for mist', () => {
    const icon = weatherIcon('mist', 'icon-class');
    const { container } = render(icon);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('lucide-cloud-fog');
    expect(svg).toHaveClass('icon-class');
  });

  it('should return Sun component for sunny', () => {
    const icon = weatherIcon('sunny', 'icon-class');
    const { container } = render(icon);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('lucide-sun');
    expect(svg).toHaveClass('icon-class');
  });

  it('should return Sun component for clear', () => {
    const icon = weatherIcon('clear', 'icon-class');
    const { container } = render(icon);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('lucide-sun');
    expect(svg).toHaveClass('icon-class');
  });

  it('should return CloudSun component for cloudy', () => {
    const icon = weatherIcon('cloudy', 'icon-class');
    const { container } = render(icon);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('lucide-cloud-sun');
    expect(svg).toHaveClass('icon-class');
  });

  it('should return CloudDrizzle component for drizzle', () => {
    const icon = weatherIcon('drizzle', 'icon-class');
    const { container } = render(icon);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('lucide-cloud-drizzle');
    expect(svg).toHaveClass('icon-class');
  });

  it('should return CloudRain component for rain', () => {
    const icon = weatherIcon('rain', 'icon-class');
    const { container } = render(icon);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('lucide-cloud-rain');
    expect(svg).toHaveClass('icon-class');
  });

  it('should return CloudLightning component for thunder', () => {
    const icon = weatherIcon('thunder', 'icon-class');
    const { container } = render(icon);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('lucide-cloud-lightning');
    expect(svg).toHaveClass('icon-class');
  });

  it('should return null for unmatched weather types', () => {
    const icon = weatherIcon('snow', 'icon-class');
    expect(icon).toBeNull();
  });

  it('should handle case-insensitivity', () => {
    const icon = weatherIcon('MIST', 'icon-class');
    const { container } = render(icon);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('lucide-cloud-fog');
  });

  it('should handle missing word parameter safely', () => {
    const icon = weatherIcon(undefined, 'icon-class');
    expect(icon).toBeNull();
  });
});
