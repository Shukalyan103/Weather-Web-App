import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { AppContext } from './context/AppContext';

// Mock the child components so we just test the App rendering logic
vi.mock('./components/WeatherDisplay', () => ({ default: () => <div data-testid="weather-display" /> }));
vi.mock('./components/WeatherForecaste', () => ({ default: () => <div data-testid="weather-forecast" /> }));
vi.mock('./components/WeeklyForcaset', () => ({ default: () => <div data-testid="weekly-forecast" /> }));
vi.mock('./components/Bargraph', () => ({ default: () => <div data-testid="bargraph" /> }));
vi.mock('./components/Loading', () => ({ default: () => <div data-testid="loading">Loading...</div> }));

describe('App Component', () => {
  it('renders loading state when loading is true', () => {
    const mockContextValue = {
      setCity: vi.fn(),
      input: '',
      setInput: vi.fn(),
      citiesData: [],
      loading: true,
    };

    render(
      <AppContext.Provider value={mockContextValue}>
        <App />
      </AppContext.Provider>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.queryByTestId('weather-display')).not.toBeInTheDocument();
  });

  it('renders weather components when loading is false', () => {
    const mockContextValue = {
      setCity: vi.fn(),
      input: '',
      setInput: vi.fn(),
      citiesData: [],
      loading: false,
    };

    render(
      <AppContext.Provider value={mockContextValue}>
        <App />
      </AppContext.Provider>
    );

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.getByTestId('weather-display')).toBeInTheDocument();
    expect(screen.getByTestId('weather-forecast')).toBeInTheDocument();
    expect(screen.getByTestId('weekly-forecast')).toBeInTheDocument();
    expect(screen.getByTestId('bargraph')).toBeInTheDocument();
  });
});
