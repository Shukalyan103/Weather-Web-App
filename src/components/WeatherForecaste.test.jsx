import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import WeatherForecaste from './WeatherForecaste';
import { AppContext } from '@/context/AppContext';

// Mock Swiper
vi.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="swiper-slide">{children}</div>,
}));

// Mock Maplocated
vi.mock('./Maplocated', () => ({
  default: () => <div data-testid="map-located">Map Component</div>,
}));

// Mock lucide-react icons to avoid svg rendering issues
vi.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left" />,
  ChevronRight: () => <div data-testid="chevron-right" />,
  CloudRain: () => <div data-testid="cloud-rain" />,
}));

describe('WeatherForecaste', () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('should not call fetch when coordinates array is empty', async () => {
    const mockContextValue = {
      citiesData: [],
      coordinates: [], // Empty coordinates array
      weatherapiKey: 'test-key',
      setLoading: vi.fn(),
      weatherIcon: vi.fn(),
    };

    render(
      <AppContext.Provider value={mockContextValue}>
        <WeatherForecaste />
      </AppContext.Provider>
    );

    // Wait for the useEffect to finish
    await waitFor(() => {
        // Fetch should not have been called because coordinates is empty
        expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('should not call fetch when coordinates is null', async () => {
    const mockContextValue = {
      citiesData: [],
      coordinates: null, // Null coordinates
      weatherapiKey: 'test-key',
      setLoading: vi.fn(),
      weatherIcon: vi.fn(),
    };

    render(
      <AppContext.Provider value={mockContextValue}>
        <WeatherForecaste />
      </AppContext.Provider>
    );

    // Wait for the useEffect to finish
    await waitFor(() => {
        // Fetch should not have been called because coordinates is null
        expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('should not call fetch when coordinates array has less than 2 elements', async () => {
    const mockContextValue = {
      citiesData: [],
      coordinates: [10], // Only 1 element
      weatherapiKey: 'test-key',
      setLoading: vi.fn(),
      weatherIcon: vi.fn(),
    };

    render(
      <AppContext.Provider value={mockContextValue}>
        <WeatherForecaste />
      </AppContext.Provider>
    );

    // Wait for the useEffect to finish
    await waitFor(() => {
        // Fetch should not have been called because coordinates has length < 2
        expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('should call fetch when valid coordinates are provided', async () => {
    // Mock fetch response
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        forecast: {
          forecastday: [
            { hour: [{ time: "2023-10-27 10:00", temp_c: 20, chance_of_rain: 10, condition: { text: "Sunny" } }] },
            { hour: [{ time: "2023-10-28 10:00", temp_c: 22, chance_of_rain: 20, condition: { text: "Cloudy" } }] },
          ]
        }
      })
    });

    const mockContextValue = {
      citiesData: [],
      coordinates: [40.7128, -74.0060], // Valid coordinates
      weatherapiKey: 'test-key',
      setLoading: vi.fn(),
      weatherIcon: vi.fn(),
    };

    render(
      <AppContext.Provider value={mockContextValue}>
        <WeatherForecaste />
      </AppContext.Provider>
    );

    // Wait for the fetch to have been called
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
          `https://api.weatherapi.com/v1/forecast.json?key=test-key&q=40.7128,-74.006&days=2`
        );
    });
  });
});
